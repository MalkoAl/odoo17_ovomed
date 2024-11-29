{
    "name": "Custom Leave Widget",
    "version": "1.0",
    "author": "MOP",
    "category": "Human Resources",
    "depends": ["web", "hr_holidays"],
    "assets": {
        "web.assets_backend": [
            "/ovm_hr_holidays/static/src/leave_stats/leave_stats.js",
            "/ovm_hr_holidays/static/src/leave_stats/leave_stats.xml",
        ],
    },
    "installable": True,
    "application": False,
    'license': 'LGPL-3',
}
