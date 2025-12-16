{
    'name': "My Module",
    'version': '17.0.1.0.0',
    'author': "Auther",
    'category': 'Category',
    "license": "LGPL-3",
    'description': """Description text""",
    'depends': [
        "sale",
    ],
    'data': [
        "views/sales_order_views.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "my_module/static/src/components/example/example.js",
            "my_module/static/src/components/example/example.xml",
        ]
    }

}
