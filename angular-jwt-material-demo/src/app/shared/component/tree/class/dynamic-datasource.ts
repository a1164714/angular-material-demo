import { BehaviorSubject, Observable, merge } from "rxjs";
import { DynamicFlatNode } from "./dynamic-flat-node";
import { FlatTreeControl } from "@angular/cdk/tree";
import { CollectionViewer, SelectionChange } from "@angular/cdk/collections";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { DynamicDatabase } from './dynamic-database.inteface';

@Injectable({
  providedIn: "root"
})
export class DynamicDataSource {

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }

  set data(value: DynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private treeControl: FlatTreeControl<DynamicFlatNode>,
    private database: DynamicDatabase
  ) { }

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this.treeControl.expansionModel.onChange.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  async toggleNode(node: DynamicFlatNode, expand: boolean) {
    node.isLoading = true;


    const index = this.data.indexOf(node);
    if (index < 0) { // If no children, or cannot find the node, no op
      return;
    }

    if (expand) {
      const children = await this.database.getChild(node.item.id);
      if (!children) {
        return;
      }
      const nodes = children.map(item =>
        new DynamicFlatNode(item, node.level + 1, item.isExpandable));
      this.data.splice(index + 1, 0, ...nodes);
    } else {
      let count = 0;
      for (let i = index + 1; i < this.data.length
        && this.data[i].level > node.level; i++ , count++) { }
      this.data.splice(index + 1, count);
    }

    // notify the change
    this.dataChange.next(this.data);
    node.isLoading = false;
  }
}
