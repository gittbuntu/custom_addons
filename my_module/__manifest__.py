{
    'name': "My Module",
    'version': '17.0.1.0.0',
    'author': "Auther",
    'category': 'Category',
    "license": "LGPL-3",
    'description': """Description text""",
    'depends': [
        # "web",
        "sale",
        'base',
        'point_of_sale'
    ],
    'data': [
        "views/sales_order_views.xml",
    ],
    "assets": {
        "web.assets_backend": [
            # "my_module/static/src/components/**/*",
            # (its a wild card if we use then no need to define line 17, 18, 19, and 20)
            "my_module/static/src/components/example/example.js",
            "my_module/static/src/components/example/example.xml",
            "my_module/static/src/components/child/child.js",
            "my_module/static/src/components/child/child.xml",
            "my_module/static/src/components/counter/counter.js",
            "my_module/static/src/components/counter/counter.xml",
            "my_module/static/src/lib/*",

        ],
        # "point_of_sale._assets_pos": [
        #     "my_module/static/src/ProductScreen.js"
        # ],
    },
    "auto_install": False,
    "installable": True,
    'license': 'OPL-1',

}
