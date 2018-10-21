import { random, name } from "faker";

export class MeetingMatrixModel {
    constructor(columns: Array<MeetingMatrixColumn>, rows: Array<MeetingMatrixRow>, values: { [rowId:number]: { [colId:number]: number } }) {
        this.columns = {};
        this.rows = {};
        this.values = values;

        columns.forEach(c => this.columns[c.id] = c);
        rows.forEach(r => this.rows[r.id] = r);
    }

    public columns: { [id: number]: MeetingMatrixColumn };
    public rows: { [id: number]: MeetingMatrixRow };
    public values: { [rowId:number]: { [colId:number]: number } };
}

export class MeetingMatrixColumn {
    id: number;
}

export class MeetingMatrixRow {
    id: number;
}

export function generateMeetingMatrix(): MeetingMatrixModel {
    return new MeetingMatrixModel(generateColumnRoles(15), generateRowRole(5), {});
};

function generateColumnRoles(count: number): Array<MeetingMatrixColumn> {
    const result = new Array<MeetingMatrixColumn>();

    for(let i = 1; i <= count; i++) {
        const role: MeetingMatrixColumn = {
            id: i * 1000
        };
        role['roleName'] = `Role ${i}`;

        const contacts = generateColumnContacts(random.number(10) + 1, role.id);
        role['contactCount'] = contacts.length;
        role['childrenIds'] = contacts.map(x => x.id);
        result.push(role);
        result.push(...contacts);
    }

    return result;
};

function generateColumnContacts(count: number, roleId: number): Array<MeetingMatrixColumn> {
    const result = new Array<MeetingMatrixColumn>();
    
    for(let i = 1; i <= count; i++) {
        const contact: MeetingMatrixColumn = {
            id: roleId + i
        };
        contact['contactFullname'] = `${name.firstName()} ${name.lastName().toUpperCase()}`;
        contact['isArchived'] = false;
        contact['parentId'] = roleId;
        result.push(contact);
    }
    
    return result;
};

function generateRowRole(count: number): Array<MeetingMatrixRow> {
    const result = new Array<MeetingMatrixRow>();

    for (let i = 1; i <= count; i++) {
        const role: MeetingMatrixRow = {
            id: i * 1_000_000
        };

        const businessLines = generateRowBusinessLine(random.number(5) + 1, role.id);
        role['roleName'] = `Role ${i}`;
        role['employeeCount'] = businessLines.reduce((p, c) => p + (!!c['employeeCount'] ? c['employeeCount'] : 0), 0);
        // role['childrenIds'] = businessLines.filter(x => !!x['businessLineName']).map(x => x.id);
        role['childrenIds'] = businessLines.map(x => x.id);

        result.push(role);
        result.push(...businessLines);
    }

    return result;
};

function generateRowBusinessLine(count: number, parentId: number): Array<MeetingMatrixRow> {
    const result = new Array<MeetingMatrixRow>();

    for (let i = 1; i <= count; i++) {
        const bl: MeetingMatrixRow = {
            id: parentId + i * 10_000
        };

        const meetings = generateRowMeeting(bl.id);
        bl['businessLineName'] = `Business Line ${i}`;
        bl['employeeCount'] = meetings.reduce( (p, c) => p + (!!c['employeeCount'] ? c['employeeCount'] : 0), 0);
        // bl['childrenIds'] = meetings.filter(x => !!x['label']).map(x => x.id);
        bl['childrenIds'] = meetings.map(x => x.id);
        bl['parentId'] = parentId;

        result.push(bl);
        result.push(...meetings);
    }

    return result;
};

function generateRowMeeting(parentId: number): Array<MeetingMatrixRow> {
    const result = new Array<MeetingMatrixRow>();

    const meeting : MeetingMatrixRow = {
        id: parentId + 1000
    };
    const meetingEmployees = generateRowEmployee(random.number(5) + 1, meeting.id);
    meeting['employeeCount'] = meetingEmployees.length;
    meeting['label'] = 'Meeting(s)';
    meeting['childrenIds'] = meetingEmployees.map(x => x.id);
    meeting['parentId'] = parentId;

    const noMeeting : MeetingMatrixRow = {
        id: parentId + 2000
    };
    const noMeetingEmployees = generateRowEmployee(random.number(5) + 1, noMeeting.id);
    noMeeting['employeeCount'] = noMeetingEmployees.length;
    noMeeting['label'] = 'No meeting(s)';
    noMeeting['childrenIds'] = noMeetingEmployees.map(x => x.id);
    noMeeting['parentId'] = parentId;

    result.push(meeting);
    result.push(...meetingEmployees);
    result.push(noMeeting);
    result.push(...noMeetingEmployees);
    return result;
};

function generateRowEmployee(count: number, parentId: number): Array<MeetingMatrixRow> {
    const result = new Array<MeetingMatrixRow>();

    for(let i = 1; i <= count; i++) {
        const employee: MeetingMatrixRow = {
            id: parentId + i
        };
        employee['employeeName'] = `${name.firstName()} ${name.lastName().toUpperCase()}`;
        employee['isInactive'] = false;
        employee['parentId'] = parentId;
        result.push(employee)
    }

    return result;
};

export const mmData = {
    "columns": {
        "1000": {
            "id": 1000,
            "roleName": "Role 1",
            "contactCount": 5,
            "childrenIds": [
                1001,
                1002,
                1003,
                1004,
                1005
            ]
        },
        "1001": {
            "id": 1001,
            "contactFullname": "Camryn FAHEY",
            "isArchived": false,
            "parentId": 1000
        },
        "1002": {
            "id": 1002,
            "contactFullname": "Lorna LABADIE",
            "isArchived": false,
            "parentId": 1000
        },
        "1003": {
            "id": 1003,
            "contactFullname": "Earlene DOYLE",
            "isArchived": false,
            "parentId": 1000
        },
        "1004": {
            "id": 1004,
            "contactFullname": "Estella LANG",
            "isArchived": false,
            "parentId": 1000
        },
        "1005": {
            "id": 1005,
            "contactFullname": "Colten MANN",
            "isArchived": false,
            "parentId": 1000
        },
        "2000": {
            "id": 2000,
            "roleName": "Role 2",
            "contactCount": 6,
            "childrenIds": [
                2001,
                2002,
                2003,
                2004,
                2005,
                2006
            ]
        },
        "2001": {
            "id": 2001,
            "contactFullname": "Breana ULLRICH",
            "isArchived": false,
            "parentId": 2000
        },
        "2002": {
            "id": 2002,
            "contactFullname": "Reinhold KULAS",
            "isArchived": false,
            "parentId": 2000
        },
        "2003": {
            "id": 2003,
            "contactFullname": "Evan GRAHAM",
            "isArchived": false,
            "parentId": 2000
        },
        "2004": {
            "id": 2004,
            "contactFullname": "Kayla STOLTENBERG",
            "isArchived": false,
            "parentId": 2000
        },
        "2005": {
            "id": 2005,
            "contactFullname": "Nicholaus JACOBS",
            "isArchived": false,
            "parentId": 2000
        },
        "2006": {
            "id": 2006,
            "contactFullname": "Timmy KEMMER",
            "isArchived": false,
            "parentId": 2000
        },
        "3000": {
            "id": 3000,
            "roleName": "Role 3",
            "contactCount": 6,
            "childrenIds": [
                3001,
                3002,
                3003,
                3004,
                3005,
                3006
            ]
        },
        "3001": {
            "id": 3001,
            "contactFullname": "Cyril ROLFSON",
            "isArchived": false,
            "parentId": 3000
        },
        "3002": {
            "id": 3002,
            "contactFullname": "Moshe COLE",
            "isArchived": false,
            "parentId": 3000
        },
        "3003": {
            "id": 3003,
            "contactFullname": "Jessika GOODWIN",
            "isArchived": false,
            "parentId": 3000
        },
        "3004": {
            "id": 3004,
            "contactFullname": "Mekhi MILLS",
            "isArchived": false,
            "parentId": 3000
        },
        "3005": {
            "id": 3005,
            "contactFullname": "Lorenz CARTER",
            "isArchived": false,
            "parentId": 3000
        },
        "3006": {
            "id": 3006,
            "contactFullname": "Destiney PRICE",
            "isArchived": false,
            "parentId": 3000
        },
        "4000": {
            "id": 4000,
            "roleName": "Role 4",
            "contactCount": 9,
            "childrenIds": [
                4001,
                4002,
                4003,
                4004,
                4005,
                4006,
                4007,
                4008,
                4009
            ]
        },
        "4001": {
            "id": 4001,
            "contactFullname": "Federico RUNTE",
            "isArchived": false,
            "parentId": 4000
        },
        "4002": {
            "id": 4002,
            "contactFullname": "Sheldon REILLY",
            "isArchived": false,
            "parentId": 4000
        },
        "4003": {
            "id": 4003,
            "contactFullname": "Wilhelm D'AMORE",
            "isArchived": false,
            "parentId": 4000
        },
        "4004": {
            "id": 4004,
            "contactFullname": "Icie PARISIAN",
            "isArchived": false,
            "parentId": 4000
        },
        "4005": {
            "id": 4005,
            "contactFullname": "Adolf ROHAN",
            "isArchived": false,
            "parentId": 4000
        },
        "4006": {
            "id": 4006,
            "contactFullname": "Emmet HYATT",
            "isArchived": false,
            "parentId": 4000
        },
        "4007": {
            "id": 4007,
            "contactFullname": "Heath GREENHOLT",
            "isArchived": false,
            "parentId": 4000
        },
        "4008": {
            "id": 4008,
            "contactFullname": "Alice HARTMANN",
            "isArchived": false,
            "parentId": 4000
        },
        "4009": {
            "id": 4009,
            "contactFullname": "Aurelio HOWE",
            "isArchived": false,
            "parentId": 4000
        },
        "5000": {
            "id": 5000,
            "roleName": "Role 5",
            "contactCount": 1,
            "childrenIds": [
                5001
            ]
        },
        "5001": {
            "id": 5001,
            "contactFullname": "Birdie PARKER",
            "isArchived": false,
            "parentId": 5000
        },
        "6000": {
            "id": 6000,
            "roleName": "Role 6",
            "contactCount": 9,
            "childrenIds": [
                6001,
                6002,
                6003,
                6004,
                6005,
                6006,
                6007,
                6008,
                6009
            ]
        },
        "6001": {
            "id": 6001,
            "contactFullname": "Hassan RUSSEL",
            "isArchived": false,
            "parentId": 6000
        },
        "6002": {
            "id": 6002,
            "contactFullname": "Shane STROMAN",
            "isArchived": false,
            "parentId": 6000
        },
        "6003": {
            "id": 6003,
            "contactFullname": "Odie BARTON",
            "isArchived": false,
            "parentId": 6000
        },
        "6004": {
            "id": 6004,
            "contactFullname": "Jackie KLING",
            "isArchived": false,
            "parentId": 6000
        },
        "6005": {
            "id": 6005,
            "contactFullname": "Filiberto GAYLORD",
            "isArchived": false,
            "parentId": 6000
        },
        "6006": {
            "id": 6006,
            "contactFullname": "Beulah KERTZMANN",
            "isArchived": false,
            "parentId": 6000
        },
        "6007": {
            "id": 6007,
            "contactFullname": "Aniya AUER",
            "isArchived": false,
            "parentId": 6000
        },
        "6008": {
            "id": 6008,
            "contactFullname": "Athena BARTELL",
            "isArchived": false,
            "parentId": 6000
        },
        "6009": {
            "id": 6009,
            "contactFullname": "Nakia HERMISTON",
            "isArchived": false,
            "parentId": 6000
        },
        "7000": {
            "id": 7000,
            "roleName": "Role 7",
            "contactCount": 6,
            "childrenIds": [
                7001,
                7002,
                7003,
                7004,
                7005,
                7006
            ]
        },
        "7001": {
            "id": 7001,
            "contactFullname": "Aditya ROSENBAUM",
            "isArchived": false,
            "parentId": 7000
        },
        "7002": {
            "id": 7002,
            "contactFullname": "Magdalena DAUGHERTY",
            "isArchived": false,
            "parentId": 7000
        },
        "7003": {
            "id": 7003,
            "contactFullname": "Nestor SWANIAWSKI",
            "isArchived": false,
            "parentId": 7000
        },
        "7004": {
            "id": 7004,
            "contactFullname": "Kariane MANN",
            "isArchived": false,
            "parentId": 7000
        },
        "7005": {
            "id": 7005,
            "contactFullname": "Clarissa KUTCH",
            "isArchived": false,
            "parentId": 7000
        },
        "7006": {
            "id": 7006,
            "contactFullname": "Doris CHRISTIANSEN",
            "isArchived": false,
            "parentId": 7000
        },
        "8000": {
            "id": 8000,
            "roleName": "Role 8",
            "contactCount": 11,
            "childrenIds": [
                8001,
                8002,
                8003,
                8004,
                8005,
                8006,
                8007,
                8008,
                8009,
                8010,
                8011
            ]
        },
        "8001": {
            "id": 8001,
            "contactFullname": "Cornelius HERMANN",
            "isArchived": false,
            "parentId": 8000
        },
        "8002": {
            "id": 8002,
            "contactFullname": "Okey FRANECKI",
            "isArchived": false,
            "parentId": 8000
        },
        "8003": {
            "id": 8003,
            "contactFullname": "Maryse HAGENES",
            "isArchived": false,
            "parentId": 8000
        },
        "8004": {
            "id": 8004,
            "contactFullname": "Leone OKUNEVA",
            "isArchived": false,
            "parentId": 8000
        },
        "8005": {
            "id": 8005,
            "contactFullname": "Ellsworth ABSHIRE",
            "isArchived": false,
            "parentId": 8000
        },
        "8006": {
            "id": 8006,
            "contactFullname": "Remington FISHER",
            "isArchived": false,
            "parentId": 8000
        },
        "8007": {
            "id": 8007,
            "contactFullname": "Genesis HACKETT",
            "isArchived": false,
            "parentId": 8000
        },
        "8008": {
            "id": 8008,
            "contactFullname": "Jaylon HAYES",
            "isArchived": false,
            "parentId": 8000
        },
        "8009": {
            "id": 8009,
            "contactFullname": "Hester DONNELLY",
            "isArchived": false,
            "parentId": 8000
        },
        "8010": {
            "id": 8010,
            "contactFullname": "Guy KEEBLER",
            "isArchived": false,
            "parentId": 8000
        },
        "8011": {
            "id": 8011,
            "contactFullname": "Tanner ROLFSON",
            "isArchived": false,
            "parentId": 8000
        },
        "9000": {
            "id": 9000,
            "roleName": "Role 9",
            "contactCount": 4,
            "childrenIds": [
                9001,
                9002,
                9003,
                9004
            ]
        },
        "9001": {
            "id": 9001,
            "contactFullname": "Pinkie JENKINS",
            "isArchived": false,
            "parentId": 9000
        },
        "9002": {
            "id": 9002,
            "contactFullname": "Cullen STARK",
            "isArchived": false,
            "parentId": 9000
        },
        "9003": {
            "id": 9003,
            "contactFullname": "Kay TORP",
            "isArchived": false,
            "parentId": 9000
        },
        "9004": {
            "id": 9004,
            "contactFullname": "Reese FEENEY",
            "isArchived": false,
            "parentId": 9000
        },
        "10000": {
            "id": 10000,
            "roleName": "Role 10",
            "contactCount": 5,
            "childrenIds": [
                10001,
                10002,
                10003,
                10004,
                10005
            ]
        },
        "10001": {
            "id": 10001,
            "contactFullname": "Santina ROBEL",
            "isArchived": false,
            "parentId": 10000
        },
        "10002": {
            "id": 10002,
            "contactFullname": "Hildegard NICOLAS",
            "isArchived": false,
            "parentId": 10000
        },
        "10003": {
            "id": 10003,
            "contactFullname": "Laron SCHOWALTER",
            "isArchived": false,
            "parentId": 10000
        },
        "10004": {
            "id": 10004,
            "contactFullname": "Adrien PFEFFER",
            "isArchived": false,
            "parentId": 10000
        },
        "10005": {
            "id": 10005,
            "contactFullname": "Tracey TURCOTTE",
            "isArchived": false,
            "parentId": 10000
        },
        "11000": {
            "id": 11000,
            "roleName": "Role 11",
            "contactCount": 5,
            "childrenIds": [
                11001,
                11002,
                11003,
                11004,
                11005
            ]
        },
        "11001": {
            "id": 11001,
            "contactFullname": "Addison LABADIE",
            "isArchived": false,
            "parentId": 11000
        },
        "11002": {
            "id": 11002,
            "contactFullname": "Thelma FAHEY",
            "isArchived": false,
            "parentId": 11000
        },
        "11003": {
            "id": 11003,
            "contactFullname": "Vance OBERBRUNNER",
            "isArchived": false,
            "parentId": 11000
        },
        "11004": {
            "id": 11004,
            "contactFullname": "Sam SANFORD",
            "isArchived": false,
            "parentId": 11000
        },
        "11005": {
            "id": 11005,
            "contactFullname": "Federico QUIGLEY",
            "isArchived": false,
            "parentId": 11000
        },
        "12000": {
            "id": 12000,
            "roleName": "Role 12",
            "contactCount": 1,
            "childrenIds": [
                12001
            ]
        },
        "12001": {
            "id": 12001,
            "contactFullname": "Dion BLANDA",
            "isArchived": false,
            "parentId": 12000
        },
        "13000": {
            "id": 13000,
            "roleName": "Role 13",
            "contactCount": 1,
            "childrenIds": [
                13001
            ]
        },
        "13001": {
            "id": 13001,
            "contactFullname": "Thalia ANDERSON",
            "isArchived": false,
            "parentId": 13000
        },
        "14000": {
            "id": 14000,
            "roleName": "Role 14",
            "contactCount": 1,
            "childrenIds": [
                14001
            ]
        },
        "14001": {
            "id": 14001,
            "contactFullname": "Anya STIEDEMANN",
            "isArchived": false,
            "parentId": 14000
        },
        "15000": {
            "id": 15000,
            "roleName": "Role 15",
            "contactCount": 10,
            "childrenIds": [
                15001,
                15002,
                15003,
                15004,
                15005,
                15006,
                15007,
                15008,
                15009,
                15010
            ]
        },
        "15001": {
            "id": 15001,
            "contactFullname": "Elnora HERMISTON",
            "isArchived": false,
            "parentId": 15000
        },
        "15002": {
            "id": 15002,
            "contactFullname": "Zoe SCHILLER",
            "isArchived": false,
            "parentId": 15000
        },
        "15003": {
            "id": 15003,
            "contactFullname": "Annetta BRAUN",
            "isArchived": false,
            "parentId": 15000
        },
        "15004": {
            "id": 15004,
            "contactFullname": "Sage BAUCH",
            "isArchived": false,
            "parentId": 15000
        },
        "15005": {
            "id": 15005,
            "contactFullname": "Destinee GRAHAM",
            "isArchived": false,
            "parentId": 15000
        },
        "15006": {
            "id": 15006,
            "contactFullname": "Leatha ROBERTS",
            "isArchived": false,
            "parentId": 15000
        },
        "15007": {
            "id": 15007,
            "contactFullname": "Rosella AUER",
            "isArchived": false,
            "parentId": 15000
        },
        "15008": {
            "id": 15008,
            "contactFullname": "Willow STROSIN",
            "isArchived": false,
            "parentId": 15000
        },
        "15009": {
            "id": 15009,
            "contactFullname": "Maximillian WILKINSON",
            "isArchived": false,
            "parentId": 15000
        },
        "15010": {
            "id": 15010,
            "contactFullname": "Garret HALVORSON",
            "isArchived": false,
            "parentId": 15000
        }
    },
    "rows": {
        "1000000": {
            "id": 1000000,
            "roleName": "Agent",
            "employeeCount": 28,
            "childrenIds": [
                1010000,
                1011000,
                1011001,
                1012000,
                1012001,
                1020000,
                1021000,
                1021001,
                1021002,
                1021003,
                1022000,
                1022001,
                1022002,
                1030000,
                1031000,
                1031001,
                1031002,
                1031003,
                1031004,
                1032000,
                1032001,
                1032002,
                1032003
            ]
        },
        "1010000": {
            "id": 1010000,
            "businessLineName": "Paradigm",
            "employeeCount": 2,
            "childrenIds": [
                1011000,
                1011001,
                1012000,
                1012001
            ],
            "parentId": 1000000
        },
        "1011000": {
            "id": 1011000,
            "employeeCount": 1,
            "label": "Meeting(s)",
            "childrenIds": [
                1011001
            ],
            "parentId": 1010000
        },
        "1011001": {
            "id": 1011001,
            "employeeName": "Robin MAYER",
            "isInactive": false,
            "parentId": 1011000
        },
        "1012000": {
            "id": 1012000,
            "employeeCount": 1,
            "label": "No meeting(s)",
            "childrenIds": [
                1012001
            ],
            "parentId": 1010000
        },
        "1012001": {
            "id": 1012001,
            "employeeName": "Valentine SCHUSTER",
            "isInactive": false,
            "parentId": 1012000
        },
        "1020000": {
            "id": 1020000,
            "businessLineName": "Security",
            "employeeCount": 5,
            "childrenIds": [
                1021000,
                1021001,
                1021002,
                1021003,
                1022000,
                1022001,
                1022002
            ],
            "parentId": 1000000
        },
        "1021000": {
            "id": 1021000,
            "employeeCount": 3,
            "label": "Meeting(s)",
            "childrenIds": [
                1021001,
                1021002,
                1021003
            ],
            "parentId": 1020000
        },
        "1021001": {
            "id": 1021001,
            "employeeName": "Emmy THOMPSON",
            "isInactive": false,
            "parentId": 1021000
        },
        "1021002": {
            "id": 1021002,
            "employeeName": "Thalia CONNELLY",
            "isInactive": false,
            "parentId": 1021000
        },
        "1021003": {
            "id": 1021003,
            "employeeName": "Sydney RUSSEL",
            "isInactive": false,
            "parentId": 1021000
        },
        "1022000": {
            "id": 1022000,
            "employeeCount": 2,
            "label": "No meeting(s)",
            "childrenIds": [
                1022001,
                1022002
            ],
            "parentId": 1020000
        },
        "1022001": {
            "id": 1022001,
            "employeeName": "Rylee KREIGER",
            "isInactive": false,
            "parentId": 1022000
        },
        "1022002": {
            "id": 1022002,
            "employeeName": "Abbigail NITZSCHE",
            "isInactive": false,
            "parentId": 1022000
        },
        "1030000": {
            "id": 1030000,
            "businessLineName": "Markets",
            "employeeCount": 7,
            "childrenIds": [
                1031000,
                1031001,
                1031002,
                1031003,
                1031004,
                1032000,
                1032001,
                1032002,
                1032003
            ],
            "parentId": 1000000
        },
        "1031000": {
            "id": 1031000,
            "employeeCount": 4,
            "label": "Meeting(s)",
            "childrenIds": [
                1031001,
                1031002,
                1031003,
                1031004
            ],
            "parentId": 1030000
        },
        "1031001": {
            "id": 1031001,
            "employeeName": "Octavia RUECKER",
            "isInactive": false,
            "parentId": 1031000
        },
        "1031002": {
            "id": 1031002,
            "employeeName": "Deshaun GREENFELDER",
            "isInactive": false,
            "parentId": 1031000
        },
        "1031003": {
            "id": 1031003,
            "employeeName": "Jerrod KLEIN",
            "isInactive": false,
            "parentId": 1031000
        },
        "1031004": {
            "id": 1031004,
            "employeeName": "Brent RATH",
            "isInactive": false,
            "parentId": 1031000
        },
        "1032000": {
            "id": 1032000,
            "employeeCount": 3,
            "label": "No meeting(s)",
            "childrenIds": [
                1032001,
                1032002,
                1032003
            ],
            "parentId": 1030000
        },
        "1032001": {
            "id": 1032001,
            "employeeName": "Taurean MILLER",
            "isInactive": false,
            "parentId": 1032000
        },
        "1032002": {
            "id": 1032002,
            "employeeName": "Alba WINTHEISER",
            "isInactive": false,
            "parentId": 1032000
        },
        "1032003": {
            "id": 1032003,
            "employeeName": "Destin RUSSEL",
            "isInactive": false,
            "parentId": 1032000
        },
        "2000000": {
            "id": 2000000,
            "roleName": "Administrator",
            "employeeCount": 16,
            "childrenIds": [
                2010000,
                2011000,
                2011001,
                2011002,
                2011003,
                2011004,
                2011005,
                2011006,
                2012000,
                2012001,
                2012002
            ]
        },
        "2010000": {
            "id": 2010000,
            "businessLineName": "Tactics",
            "employeeCount": 8,
            "childrenIds": [
                2011000,
                2011001,
                2011002,
                2011003,
                2011004,
                2011005,
                2011006,
                2012000,
                2012001,
                2012002
            ],
            "parentId": 2000000
        },
        "2011000": {
            "id": 2011000,
            "employeeCount": 6,
            "label": "Meeting(s)",
            "childrenIds": [
                2011001,
                2011002,
                2011003,
                2011004,
                2011005,
                2011006
            ],
            "parentId": 2010000
        },
        "2011001": {
            "id": 2011001,
            "employeeName": "Randi FEENEY",
            "isInactive": false,
            "parentId": 2011000
        },
        "2011002": {
            "id": 2011002,
            "employeeName": "Maureen BAUCH",
            "isInactive": false,
            "parentId": 2011000
        },
        "2011003": {
            "id": 2011003,
            "employeeName": "Shaylee WATSICA",
            "isInactive": false,
            "parentId": 2011000
        },
        "2011004": {
            "id": 2011004,
            "employeeName": "Francisco CARTWRIGHT",
            "isInactive": false,
            "parentId": 2011000
        },
        "2011005": {
            "id": 2011005,
            "employeeName": "Alexanne BODE",
            "isInactive": false,
            "parentId": 2011000
        },
        "2011006": {
            "id": 2011006,
            "employeeName": "Demond PAGAC",
            "isInactive": false,
            "parentId": 2011000
        },
        "2012000": {
            "id": 2012000,
            "employeeCount": 2,
            "label": "No meeting(s)",
            "childrenIds": [
                2012001,
                2012002
            ],
            "parentId": 2010000
        },
        "2012001": {
            "id": 2012001,
            "employeeName": "Jerome CORWIN",
            "isInactive": false,
            "parentId": 2012000
        },
        "2012002": {
            "id": 2012002,
            "employeeName": "Braden MOSCISKI",
            "isInactive": false,
            "parentId": 2012000
        },
        "3000000": {
            "id": 3000000,
            "roleName": "Facilitator",
            "employeeCount": 50,
            "childrenIds": [
                3010000,
                3011000,
                3011001,
                3011002,
                3011003,
                3011004,
                3011005,
                3011006,
                3012000,
                3012001,
                3012002,
                3012003,
                3020000,
                3021000,
                3021001,
                3021002,
                3021003,
                3021004,
                3021005,
                3022000,
                3022001,
                3022002,
                3022003,
                3022004,
                3022005,
                3030000,
                3031000,
                3031001,
                3032000,
                3032001,
                3032002,
                3032003,
                3032004,
                3032005
            ]
        },
        "3010000": {
            "id": 3010000,
            "businessLineName": "Security",
            "employeeCount": 9,
            "childrenIds": [
                3011000,
                3011001,
                3011002,
                3011003,
                3011004,
                3011005,
                3011006,
                3012000,
                3012001,
                3012002,
                3012003
            ],
            "parentId": 3000000
        },
        "3011000": {
            "id": 3011000,
            "employeeCount": 6,
            "label": "Meeting(s)",
            "childrenIds": [
                3011001,
                3011002,
                3011003,
                3011004,
                3011005,
                3011006
            ],
            "parentId": 3010000
        },
        "3011001": {
            "id": 3011001,
            "employeeName": "Jett HAMMES",
            "isInactive": false,
            "parentId": 3011000
        },
        "3011002": {
            "id": 3011002,
            "employeeName": "Roselyn GERHOLD",
            "isInactive": false,
            "parentId": 3011000
        },
        "3011003": {
            "id": 3011003,
            "employeeName": "Enola EMMERICH",
            "isInactive": false,
            "parentId": 3011000
        },
        "3011004": {
            "id": 3011004,
            "employeeName": "Arch RYAN",
            "isInactive": false,
            "parentId": 3011000
        },
        "3011005": {
            "id": 3011005,
            "employeeName": "Bernard RYAN",
            "isInactive": false,
            "parentId": 3011000
        },
        "3011006": {
            "id": 3011006,
            "employeeName": "Trace HAND",
            "isInactive": false,
            "parentId": 3011000
        },
        "3012000": {
            "id": 3012000,
            "employeeCount": 3,
            "label": "No meeting(s)",
            "childrenIds": [
                3012001,
                3012002,
                3012003
            ],
            "parentId": 3010000
        },
        "3012001": {
            "id": 3012001,
            "employeeName": "Berneice BAUCH",
            "isInactive": false,
            "parentId": 3012000
        },
        "3012002": {
            "id": 3012002,
            "employeeName": "Hilton ZIEME",
            "isInactive": false,
            "parentId": 3012000
        },
        "3012003": {
            "id": 3012003,
            "employeeName": "Keith DURGAN",
            "isInactive": false,
            "parentId": 3012000
        },
        "3020000": {
            "id": 3020000,
            "businessLineName": "Metrics",
            "employeeCount": 10,
            "childrenIds": [
                3021000,
                3021001,
                3021002,
                3021003,
                3021004,
                3021005,
                3022000,
                3022001,
                3022002,
                3022003,
                3022004,
                3022005
            ],
            "parentId": 3000000
        },
        "3021000": {
            "id": 3021000,
            "employeeCount": 5,
            "label": "Meeting(s)",
            "childrenIds": [
                3021001,
                3021002,
                3021003,
                3021004,
                3021005
            ],
            "parentId": 3020000
        },
        "3021001": {
            "id": 3021001,
            "employeeName": "Felipa RIPPIN",
            "isInactive": false,
            "parentId": 3021000
        },
        "3021002": {
            "id": 3021002,
            "employeeName": "Torey SCHAEFER",
            "isInactive": false,
            "parentId": 3021000
        },
        "3021003": {
            "id": 3021003,
            "employeeName": "Sasha KLOCKO",
            "isInactive": false,
            "parentId": 3021000
        },
        "3021004": {
            "id": 3021004,
            "employeeName": "Deja WALTER",
            "isInactive": false,
            "parentId": 3021000
        },
        "3021005": {
            "id": 3021005,
            "employeeName": "Aimee MOHR",
            "isInactive": false,
            "parentId": 3021000
        },
        "3022000": {
            "id": 3022000,
            "employeeCount": 5,
            "label": "No meeting(s)",
            "childrenIds": [
                3022001,
                3022002,
                3022003,
                3022004,
                3022005
            ],
            "parentId": 3020000
        },
        "3022001": {
            "id": 3022001,
            "employeeName": "Evert COLLIER",
            "isInactive": false,
            "parentId": 3022000
        },
        "3022002": {
            "id": 3022002,
            "employeeName": "Jaylan JOHNSTON",
            "isInactive": false,
            "parentId": 3022000
        },
        "3022003": {
            "id": 3022003,
            "employeeName": "Kaden GOYETTE",
            "isInactive": false,
            "parentId": 3022000
        },
        "3022004": {
            "id": 3022004,
            "employeeName": "Ransom KUHN",
            "isInactive": false,
            "parentId": 3022000
        },
        "3022005": {
            "id": 3022005,
            "employeeName": "Alda CONN",
            "isInactive": false,
            "parentId": 3022000
        },
        "3030000": {
            "id": 3030000,
            "businessLineName": "Research",
            "employeeCount": 6,
            "childrenIds": [
                3031000,
                3031001,
                3032000,
                3032001,
                3032002,
                3032003,
                3032004,
                3032005
            ],
            "parentId": 3000000
        },
        "3031000": {
            "id": 3031000,
            "employeeCount": 1,
            "label": "Meeting(s)",
            "childrenIds": [
                3031001
            ],
            "parentId": 3030000
        },
        "3031001": {
            "id": 3031001,
            "employeeName": "Dominique LUETTGEN",
            "isInactive": false,
            "parentId": 3031000
        },
        "3032000": {
            "id": 3032000,
            "employeeCount": 5,
            "label": "No meeting(s)",
            "childrenIds": [
                3032001,
                3032002,
                3032003,
                3032004,
                3032005
            ],
            "parentId": 3030000
        },
        "3032001": {
            "id": 3032001,
            "employeeName": "Bryana O'HARA",
            "isInactive": false,
            "parentId": 3032000
        },
        "3032002": {
            "id": 3032002,
            "employeeName": "Dayton HICKLE",
            "isInactive": false,
            "parentId": 3032000
        },
        "3032003": {
            "id": 3032003,
            "employeeName": "Arianna KING",
            "isInactive": false,
            "parentId": 3032000
        },
        "3032004": {
            "id": 3032004,
            "employeeName": "Nedra DICKI",
            "isInactive": false,
            "parentId": 3032000
        },
        "3032005": {
            "id": 3032005,
            "employeeName": "Montana LOWE",
            "isInactive": false,
            "parentId": 3032000
        },
        "4000000": {
            "id": 4000000,
            "roleName": "Developer",
            "employeeCount": 44,
            "childrenIds": [
                4010000,
                4011000,
                4011001,
                4011002,
                4011003,
                4011004,
                4011005,
                4011006,
                4012000,
                4012001,
                4012002,
                4012003,
                4012004,
                4012005,
                4012006,
                4020000,
                4021000,
                4021001,
                4021002,
                4021003,
                4021004,
                4021005,
                4021006,
                4022000,
                4022001,
                4022002,
                4022003,
                4022004
            ]
        },
        "4010000": {
            "id": 4010000,
            "businessLineName": "Communications",
            "employeeCount": 12,
            "childrenIds": [
                4011000,
                4011001,
                4011002,
                4011003,
                4011004,
                4011005,
                4011006,
                4012000,
                4012001,
                4012002,
                4012003,
                4012004,
                4012005,
                4012006
            ],
            "parentId": 4000000
        },
        "4011000": {
            "id": 4011000,
            "employeeCount": 6,
            "label": "Meeting(s)",
            "childrenIds": [
                4011001,
                4011002,
                4011003,
                4011004,
                4011005,
                4011006
            ],
            "parentId": 4010000
        },
        "4011001": {
            "id": 4011001,
            "employeeName": "Ebba OSINSKI",
            "isInactive": false,
            "parentId": 4011000
        },
        "4011002": {
            "id": 4011002,
            "employeeName": "Billie HAYES",
            "isInactive": false,
            "parentId": 4011000
        },
        "4011003": {
            "id": 4011003,
            "employeeName": "Francesca EBERT",
            "isInactive": false,
            "parentId": 4011000
        },
        "4011004": {
            "id": 4011004,
            "employeeName": "Kaleigh ABERNATHY",
            "isInactive": false,
            "parentId": 4011000
        },
        "4011005": {
            "id": 4011005,
            "employeeName": "Hailie CUMMINGS",
            "isInactive": false,
            "parentId": 4011000
        },
        "4011006": {
            "id": 4011006,
            "employeeName": "Arlo DANIEL",
            "isInactive": false,
            "parentId": 4011000
        },
        "4012000": {
            "id": 4012000,
            "employeeCount": 6,
            "label": "No meeting(s)",
            "childrenIds": [
                4012001,
                4012002,
                4012003,
                4012004,
                4012005,
                4012006
            ],
            "parentId": 4010000
        },
        "4012001": {
            "id": 4012001,
            "employeeName": "Ansel KIRLIN",
            "isInactive": false,
            "parentId": 4012000
        },
        "4012002": {
            "id": 4012002,
            "employeeName": "Forest KUHN",
            "isInactive": false,
            "parentId": 4012000
        },
        "4012003": {
            "id": 4012003,
            "employeeName": "Pattie KEEBLER",
            "isInactive": false,
            "parentId": 4012000
        },
        "4012004": {
            "id": 4012004,
            "employeeName": "Sydnee BOEHM",
            "isInactive": false,
            "parentId": 4012000
        },
        "4012005": {
            "id": 4012005,
            "employeeName": "Mohammed HILPERT",
            "isInactive": false,
            "parentId": 4012000
        },
        "4012006": {
            "id": 4012006,
            "employeeName": "Glenda RITCHIE",
            "isInactive": false,
            "parentId": 4012000
        },
        "4020000": {
            "id": 4020000,
            "businessLineName": "Marketing",
            "employeeCount": 10,
            "childrenIds": [
                4021000,
                4021001,
                4021002,
                4021003,
                4021004,
                4021005,
                4021006,
                4022000,
                4022001,
                4022002,
                4022003,
                4022004
            ],
            "parentId": 4000000
        },
        "4021000": {
            "id": 4021000,
            "employeeCount": 6,
            "label": "Meeting(s)",
            "childrenIds": [
                4021001,
                4021002,
                4021003,
                4021004,
                4021005,
                4021006
            ],
            "parentId": 4020000
        },
        "4021001": {
            "id": 4021001,
            "employeeName": "Erik BARTELL",
            "isInactive": false,
            "parentId": 4021000
        },
        "4021002": {
            "id": 4021002,
            "employeeName": "Freida WALKER",
            "isInactive": false,
            "parentId": 4021000
        },
        "4021003": {
            "id": 4021003,
            "employeeName": "Ansel WHITE",
            "isInactive": false,
            "parentId": 4021000
        },
        "4021004": {
            "id": 4021004,
            "employeeName": "Elise CARTWRIGHT",
            "isInactive": false,
            "parentId": 4021000
        },
        "4021005": {
            "id": 4021005,
            "employeeName": "Rafael RAYNOR",
            "isInactive": false,
            "parentId": 4021000
        },
        "4021006": {
            "id": 4021006,
            "employeeName": "Kathleen ROOB",
            "isInactive": false,
            "parentId": 4021000
        },
        "4022000": {
            "id": 4022000,
            "employeeCount": 4,
            "label": "No meeting(s)",
            "childrenIds": [
                4022001,
                4022002,
                4022003,
                4022004
            ],
            "parentId": 4020000
        },
        "4022001": {
            "id": 4022001,
            "employeeName": "Braxton SCHUMM",
            "isInactive": false,
            "parentId": 4022000
        },
        "4022002": {
            "id": 4022002,
            "employeeName": "Luigi KUHLMAN",
            "isInactive": false,
            "parentId": 4022000
        },
        "4022003": {
            "id": 4022003,
            "employeeName": "Shemar FADEL",
            "isInactive": false,
            "parentId": 4022000
        },
        "4022004": {
            "id": 4022004,
            "employeeName": "Ila KERTZMANN",
            "isInactive": false,
            "parentId": 4022000
        },
        "5000000": {
            "id": 5000000,
            "roleName": "Facilitator",
            "employeeCount": 62,
            "childrenIds": [
                5010000,
                5011000,
                5011001,
                5011002,
                5011003,
                5012000,
                5012001,
                5012002,
                5012003,
                5012004,
                5012005,
                5020000,
                5021000,
                5021001,
                5022000,
                5022001,
                5022002,
                5022003,
                5022004,
                5030000,
                5031000,
                5031001,
                5031002,
                5031003,
                5031004,
                5031005,
                5031006,
                5032000,
                5032001,
                5032002,
                5032003,
                5032004,
                5040000,
                5041000,
                5041001,
                5041002,
                5041003,
                5041004,
                5041005,
                5042000,
                5042001,
                5042002,
                5042003
            ]
        },
        "5010000": {
            "id": 5010000,
            "businessLineName": "Web",
            "employeeCount": 8,
            "childrenIds": [
                5011000,
                5011001,
                5011002,
                5011003,
                5012000,
                5012001,
                5012002,
                5012003,
                5012004,
                5012005
            ],
            "parentId": 5000000
        },
        "5011000": {
            "id": 5011000,
            "employeeCount": 3,
            "label": "Meeting(s)",
            "childrenIds": [
                5011001,
                5011002,
                5011003
            ],
            "parentId": 5010000
        },
        "5011001": {
            "id": 5011001,
            "employeeName": "Jeffrey MOEN",
            "isInactive": false,
            "parentId": 5011000
        },
        "5011002": {
            "id": 5011002,
            "employeeName": "Bryana HAGENES",
            "isInactive": false,
            "parentId": 5011000
        },
        "5011003": {
            "id": 5011003,
            "employeeName": "Hobart GOODWIN",
            "isInactive": false,
            "parentId": 5011000
        },
        "5012000": {
            "id": 5012000,
            "employeeCount": 5,
            "label": "No meeting(s)",
            "childrenIds": [
                5012001,
                5012002,
                5012003,
                5012004,
                5012005
            ],
            "parentId": 5010000
        },
        "5012001": {
            "id": 5012001,
            "employeeName": "Avery ERNSER",
            "isInactive": false,
            "parentId": 5012000
        },
        "5012002": {
            "id": 5012002,
            "employeeName": "Abdullah PARKER",
            "isInactive": false,
            "parentId": 5012000
        },
        "5012003": {
            "id": 5012003,
            "employeeName": "Roger KILBACK",
            "isInactive": false,
            "parentId": 5012000
        },
        "5012004": {
            "id": 5012004,
            "employeeName": "Lorine HYATT",
            "isInactive": false,
            "parentId": 5012000
        },
        "5012005": {
            "id": 5012005,
            "employeeName": "Wallace HAND",
            "isInactive": false,
            "parentId": 5012000
        },
        "5020000": {
            "id": 5020000,
            "businessLineName": "Tactics",
            "employeeCount": 5,
            "childrenIds": [
                5021000,
                5021001,
                5022000,
                5022001,
                5022002,
                5022003,
                5022004
            ],
            "parentId": 5000000
        },
        "5021000": {
            "id": 5021000,
            "employeeCount": 1,
            "label": "Meeting(s)",
            "childrenIds": [
                5021001
            ],
            "parentId": 5020000
        },
        "5021001": {
            "id": 5021001,
            "employeeName": "Joanie KUHN",
            "isInactive": false,
            "parentId": 5021000
        },
        "5022000": {
            "id": 5022000,
            "employeeCount": 4,
            "label": "No meeting(s)",
            "childrenIds": [
                5022001,
                5022002,
                5022003,
                5022004
            ],
            "parentId": 5020000
        },
        "5022001": {
            "id": 5022001,
            "employeeName": "Austyn SCHOWALTER",
            "isInactive": false,
            "parentId": 5022000
        },
        "5022002": {
            "id": 5022002,
            "employeeName": "Kenny GREEN",
            "isInactive": false,
            "parentId": 5022000
        },
        "5022003": {
            "id": 5022003,
            "employeeName": "Lisette BAUCH",
            "isInactive": false,
            "parentId": 5022000
        },
        "5022004": {
            "id": 5022004,
            "employeeName": "Audrey BASHIRIAN",
            "isInactive": false,
            "parentId": 5022000
        },
        "5030000": {
            "id": 5030000,
            "businessLineName": "Division",
            "employeeCount": 10,
            "childrenIds": [
                5031000,
                5031001,
                5031002,
                5031003,
                5031004,
                5031005,
                5031006,
                5032000,
                5032001,
                5032002,
                5032003,
                5032004
            ],
            "parentId": 5000000
        },
        "5031000": {
            "id": 5031000,
            "employeeCount": 6,
            "label": "Meeting(s)",
            "childrenIds": [
                5031001,
                5031002,
                5031003,
                5031004,
                5031005,
                5031006
            ],
            "parentId": 5030000
        },
        "5031001": {
            "id": 5031001,
            "employeeName": "Christop HALEY",
            "isInactive": false,
            "parentId": 5031000
        },
        "5031002": {
            "id": 5031002,
            "employeeName": "Nakia ROBEL",
            "isInactive": false,
            "parentId": 5031000
        },
        "5031003": {
            "id": 5031003,
            "employeeName": "Burnice WILLIAMSON",
            "isInactive": false,
            "parentId": 5031000
        },
        "5031004": {
            "id": 5031004,
            "employeeName": "Lemuel BOTSFORD",
            "isInactive": false,
            "parentId": 5031000
        },
        "5031005": {
            "id": 5031005,
            "employeeName": "Ida SPINKA",
            "isInactive": false,
            "parentId": 5031000
        },
        "5031006": {
            "id": 5031006,
            "employeeName": "Grace NADER",
            "isInactive": false,
            "parentId": 5031000
        },
        "5032000": {
            "id": 5032000,
            "employeeCount": 4,
            "label": "No meeting(s)",
            "childrenIds": [
                5032001,
                5032002,
                5032003,
                5032004
            ],
            "parentId": 5030000
        },
        "5032001": {
            "id": 5032001,
            "employeeName": "Mallory ROLFSON",
            "isInactive": false,
            "parentId": 5032000
        },
        "5032002": {
            "id": 5032002,
            "employeeName": "Leatha TURCOTTE",
            "isInactive": false,
            "parentId": 5032000
        },
        "5032003": {
            "id": 5032003,
            "employeeName": "Heloise LIND",
            "isInactive": false,
            "parentId": 5032000
        },
        "5032004": {
            "id": 5032004,
            "employeeName": "Zachary REINGER",
            "isInactive": false,
            "parentId": 5032000
        },
        "5040000": {
            "id": 5040000,
            "businessLineName": "Program",
            "employeeCount": 8,
            "childrenIds": [
                5041000,
                5041001,
                5041002,
                5041003,
                5041004,
                5041005,
                5042000,
                5042001,
                5042002,
                5042003
            ],
            "parentId": 5000000
        },
        "5041000": {
            "id": 5041000,
            "employeeCount": 5,
            "label": "Meeting(s)",
            "childrenIds": [
                5041001,
                5041002,
                5041003,
                5041004,
                5041005
            ],
            "parentId": 5040000
        },
        "5041001": {
            "id": 5041001,
            "employeeName": "Tyson TRANTOW",
            "isInactive": false,
            "parentId": 5041000
        },
        "5041002": {
            "id": 5041002,
            "employeeName": "Jarvis KESSLER",
            "isInactive": false,
            "parentId": 5041000
        },
        "5041003": {
            "id": 5041003,
            "employeeName": "Abner BRUEN",
            "isInactive": false,
            "parentId": 5041000
        },
        "5041004": {
            "id": 5041004,
            "employeeName": "Bertrand WITTING",
            "isInactive": false,
            "parentId": 5041000
        },
        "5041005": {
            "id": 5041005,
            "employeeName": "Allan O'CONNELL",
            "isInactive": false,
            "parentId": 5041000
        },
        "5042000": {
            "id": 5042000,
            "employeeCount": 3,
            "label": "No meeting(s)",
            "childrenIds": [
                5042001,
                5042002,
                5042003
            ],
            "parentId": 5040000
        },
        "5042001": {
            "id": 5042001,
            "employeeName": "Donavon DIETRICH",
            "isInactive": false,
            "parentId": 5042000
        },
        "5042002": {
            "id": 5042002,
            "employeeName": "Ricardo TORP",
            "isInactive": false,
            "parentId": 5042000
        },
        "5042003": {
            "id": 5042003,
            "employeeName": "Craig HINTZ",
            "isInactive": false,
            "parentId": 5042000
        }
    },
    "values": {}
};