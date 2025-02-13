#!/bin/bash
mongoimport --host 54.89.143.59 --db spaceofsport_products --collection products --type json --file /data/products.json --jsonArray
