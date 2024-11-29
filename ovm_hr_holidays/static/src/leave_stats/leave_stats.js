/** @odoo-module **/
console.log("Custom Leave Widget JavaScript loaded!");

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { useRecordObserver } from "@web/model/relational_model/utils";

import { formatDate } from "@web/core/l10n/dates";
import { Component, useState, onWillStart } from "@odoo/owl";

const { DateTime } = luxon;

export class LeaveStatsComponent extends Component {
    setup() {
        this.orm = useService("orm");

        this.state = useState({
            leaves: [],
        });

        this.date = this.props.record.data.date_from || DateTime.now();
        this.employee = this.props.record.data.employee_id;

        onWillStart(async () => {
            await this.loadLeaves(this.date, this.employee);
        });

        useRecordObserver(async (record) => {
            const dateFrom = record.data.date_from || DateTime.now();
            const employee = record.data.employee_id;

            if ((this.employee && this.employee[0]) !== employee[0]) {
                await this.loadLeaves(dateFrom, employee);
            }

            this.date = dateFrom;
            this.employee = employee;
        });
    }

    async loadLeaves(date, employee) {
        if (!(employee && date)) {
            this.state.leaves = [];
            return;
        }

        const dateFrom = date.startOf("year");
        const dateTo = date.endOf("year");

        this.state.leaves = await this.orm.searchRead(
            "hr.leave",
            [
                ["employee_id", "=", employee[0]],
                ["date_from", "<=", dateTo],
                ["date_to", ">=", dateFrom],
            ],
            ["holiday_status_id", "number_of_days", "date_from", "date_to", "state", "department_id"]
        );

        this.state.leaves = this.state.leaves.map((leave) => ({
            ...leave,
            dateFrom: leave.date_from
                ? formatDate(DateTime.fromSQL(leave.date_from, { zone: "utc" }).toLocal())
                : "N/A",
            dateTo: leave.date_to
                ? formatDate(DateTime.fromSQL(leave.date_to, { zone: "utc" }).toLocal())
                : "N/A",
            departmentName: leave.department_id ? leave.department_id[1] : "No Department",
//            applicationName: leave.application_id ? leave.application_id[1] : "No Application",
        }));
    }
}

LeaveStatsComponent.template = "ovm_hr_holidays.LeaveStatsComponent";

registry.category("view_widgets").add("ovm_hr_leave_stats", {
    component: LeaveStatsComponent,
});
