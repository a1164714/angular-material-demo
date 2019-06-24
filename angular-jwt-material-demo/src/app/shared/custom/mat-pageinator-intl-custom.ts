import { MatPaginatorIntl } from '@angular/material';

export class MatPaginatorIntlCustom extends MatPaginatorIntl {

    itemsPerPageLabel = '每页条数: ';
    nextPageLabel = '下一页';
    previousPageLabel = '上一页';
    firstPageLabel = '首页';
    lastPageLabel = '尾页';

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return '0 of ' + length;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `第${startIndex + 1} - ${endIndex} 条, 总共 ${length}条`;
    }

}