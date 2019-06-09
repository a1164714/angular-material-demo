import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DynamicDatabase } from "src/app/shared/component/tree/class/dynamic-database.inteface";
import { DynamicFlatNode } from "src/app/shared/component/tree/class/dynamic-flat-node";

@Injectable({
    providedIn: "root"
})
export class DynamicDatabaseImpl implements DynamicDatabase {

    constructor(private http: HttpClient) {
    }

    async getRoot(): Promise<DynamicFlatNode[]> {
        const data = await this.http.get<any[]>("/api/tree/root").toPromise();
        return data.map(item => new DynamicFlatNode(item, 0, item.isExpandable));
    }

    async  getChild(id: string): Promise<any[]> {
        return await this.http.get<any[]>(`/api/tree/child/${id}`).toPromise();
    }

}
