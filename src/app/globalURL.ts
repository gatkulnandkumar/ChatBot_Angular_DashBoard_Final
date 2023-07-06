import { OnInit, Directive } from '@angular/core';
// import configJson from "src/config.json"
// import configJson from 'src/assets/config.json';

import configJson from 'src/assets/config.json' 

@Directive()
export class globalUrl implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
    public static tokenUrl = configJson.tokenUrl;
    public static signIn = globalUrl.tokenUrl;

    public static gateWayUrl = configJson.gateWayUrl;

    public static getAllTemplateUrl = configJson.gateWayUrl;

    public static insertTemplateUrl = configJson.gateWayUrl + '/insertData';

    public static updateServiceUrl = configJson.gateWayUrl + '/updateConstant';

    public static fetchallServiceLogUrl = configJson.gateWayUrl + '/fetchallServiceLog';

    public static getServiceLogFilterUrl = configJson.gateWayUrl + '/fetchServiceLogByDateRange';
    
    public static fetchallAuditLogUrl = configJson.gateWayUrl + '/fetchallAuditLog';
    

}
