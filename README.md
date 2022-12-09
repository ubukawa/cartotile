# cartotile
small scale data conversion from esri server


# Usage
1. Check cofigration information in config/default.hjson. In particular, the numbers of records in layers may change.
2. Run index.js to obtain "temp-json.json" that stores all records. Sometimes, socker hang up error may occur due to the server, but please just try again.
3. Convert "temp-json.json" into vector tile using tippicanoe.
```
tippecanoe -e docs/tile --projection=EPSG:3857 --force --no-tile-compression --no-feature-limit --no-tile-size-limit --drop-rate=1 output004.json
```