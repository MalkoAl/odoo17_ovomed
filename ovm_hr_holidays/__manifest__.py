# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'Time Off ovomed',
    'version': '1.0',
    'category': 'Human Resources/Time Off',
    'sequence': 95,
    'summary': 'Allocate PTOs and follow leaves requests',
    'website': 'https://www.ovomed.com',
    'description': """
Manage time off requests and allocations
=====================================

This application controls the time off schedule of your company. It allows employees to request time off. Then, managers can review requests for time off and approve or reject them. This way you can control the overall time off planning for the company or department.

You can configure several kinds of time off (sickness, paid days, ...) and allocate time off to an employee or department quickly using time off allocation. An employee can also make a request for more days off by making a new time off allocation. It will increase the total of available days for that time off type (if the request is accepted).

You can keep track of time off in different ways by following reports:

* Time Off Summary
* Time Off by Department
* Time Off Analysis

A synchronization with an internal agenda (Meetings of the CRM module) is also possible in order to automatically create a meeting when a time off request is accepted by setting up a type of meeting in time off Type.
""",
    "depends": ["hr_holidays"],
    "assets": {
        "web.assets_backend": [
            "/ovm_hr_holidays/static/src/leave_stats/leave_stats.js",
            "/ovm_hr_holidays/static/src/leave_stats/leave_stats.xml",
        ],
    },
    'installable': True,
    'application': True,

}
