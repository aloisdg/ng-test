import { MeetingMatrixModel } from "api/meetingMatrix";

export class MeetingMatrix {
    constructor(columns: Array<MMColumn>, rows: Array<MMRow>, values: { [rowId:number]: { [colId:number]: number } }) {
        this.columns = columns;
        this.indexedColumns = {};
        this.columns.forEach(x => this.indexedColumns[x.id] = x);
        this.rows = rows;
        this.indexedRows = {};
        this.rows.forEach(x => this.indexedRows[x.id] = x);
        this.values = values;
    }

    public columns: Array<MMColumn>;
    public indexedColumns: { [id:number]: MMColumn};
    public rows: Array<MMRow>;
    public indexedRows: { [id: number]: MMRow };
    public values: { [rowId:number]: { [colId:number]: number } };

    public setColumnVisible(colId: number, visible: boolean): void {
        this.indexedColumns[colId].childrenIds.forEach(childrenId => this.indexedColumns[childrenId].isVisible = !visible);
        this.indexedColumns[colId].isVisible = visible;
    }

    private collapseRow(rowId: number): void {
        const row = this.indexedRows[rowId];
        row.isExpanded = false;
        row.childrenIds.forEach(id => this.collapseRow(id));
    };

    public toggleRow(rowId: number) {
        const row = this.indexedRows[rowId];
        if (row.isExpanded) {
            this.collapseRow(rowId);
        } else {
            row.isExpanded = true;
        }
    };
}

enum ColumnType { Role, Contact }

class MMColumn {
    private _header: string;

    constructor(id: number, parentId: number, type: ColumnType, header: string, contactCount: number, isVisible: boolean, childrenIds: Array<number>) {
        this.id = id;
        this.parentId = parentId;
        this.type = type;
        this._header = header;
        this.contactCount = contactCount;
        this.isVisible = isVisible;
        this.childrenIds = childrenIds;
    }

    public id: number;
    public parentId: number;
    public type: ColumnType;
    public get header1(): string { return this._header; };
    public get header2(): string { return this.type === ColumnType.Contact ? this._header : `${this.contactCount} contact(s)`};
    public contactCount: number;
    public get colSpan(): number { return this.type === ColumnType.Role && !this.isVisible ? this.childrenIds.length : 1; };
    public isVisible: boolean;
    public childrenIds: Array<number>;
}

enum RowType { Role, BusinessLine, Meeting, Employee }

class MMRow {
    private _header: string;

    constructor(id: number, parentId: number, type: RowType, header: string, employeeCount: number, childrenIds: Array<number>) {
        this.id = id;
        this.parentId = parentId;
        this.type = type;
        this._header = header;
        this.employeeCount = employeeCount;
        this.isExpanded = false;
        this.childrenIds = childrenIds;
        this.isParentVisible = this.type === RowType.BusinessLine;
    }

    public id: number;
    public parentId: number;
    public type: RowType;
    public get header(): string { return this._header; };
    public get header2(): string { return this.type === RowType.Employee ? this._header : `${this.employeeCount} employee(s)`; }
    public employeeCount: number;
    public colSpan: number;
    public get rowSpan(): number { 
        if (this.type === RowType.Employee || !this.isExpanded) {
            return 1;
        }

        if (this.type === RowType.Meeting) {
            return this.childrenIds.length + 1;
        }
        return this.childrenIds.length;
    };
    public isParentVisible: boolean;
    public isVisible: boolean;
    public isExpanded: boolean;
    public childrenIds: Array<number>;
}

export function toModel(response: MeetingMatrixModel): MeetingMatrix {
    const columns: Array<MMColumn> = [];
    const rows: Array<MMRow> = [];

    for (const id in response.columns) {
        const colId = +id;
        let type = ColumnType.Contact;
        let header = response.columns[colId]['roleName'] || response.columns[colId]['contactFullname'];
        let contactCount = +response.columns[colId]['contactCount'] || 1;
        let isVisible = false;
        let childrenIds = response.columns[colId]['childrenIds'] || [];
        let parentId = +response.columns[colId]['parentId'];
       
        if (!!response.columns[colId]['roleName']) {
            type = ColumnType.Role;
            isVisible = true;
        }
        
        columns.push(new MMColumn(colId, parentId, type, header, contactCount, isVisible, childrenIds));
    }

    for (const id in response.rows) {
        const rowId = +id;
        let type = RowType.Employee;
        let header = response.rows[rowId]['roleName'] || response.rows[rowId]['businessLineName'] || response.rows[rowId]['label'] || response.rows[rowId]['employeeName'];
        let employeeCount = +response.rows[rowId]['employeeCount'] || 1;
        let childrendIds = response.rows[rowId]['childrenIds'] || [];
        let parentId = +response.rows[rowId]['parentId'];

        if (!!response.rows[rowId]['roleName']) {
            type = RowType.Role;
        } else if (!!response.rows[rowId]['businessLineName']) {
            type = RowType.BusinessLine;
        } else if (!!response.rows[rowId]['label']) {
            type = RowType.Meeting;
        }

        rows.push(new MMRow(rowId, parentId, type, header, employeeCount, childrendIds));
    }

    return new MeetingMatrix(columns, rows, response.values);
} 

function getColumnRoleParentId(colId: number): number {
    return colId - (colId % 1_000);
}

function getRowRoleParentId(rowId: number): number {
    return rowId - (rowId % 1_000_000);
}

function getRowBusinessLineParentId(rowId: number): number {
    return rowId - (rowId % 10_000);
}

function getRowMeetingParentId(rowId: number): number {
    return rowId - (rowId % 1_000);
}
