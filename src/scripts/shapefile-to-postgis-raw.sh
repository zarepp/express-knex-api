#!/bin/bash

# How to use:
# Move to directory contain __.shp file
# Example: cd /path/to/serandu/ - where inside directory has files: 11serandu.shp, 11serandu.dbf, 11serandu.prj etc..
# Run this command from inside directory
# sh /path/to/this/file/shapefile-to-postgis-raw.sh <DB_HOST> <DB_PORT> <DB_USER> <DB_NAME>

while getopts h:p:u:d:f:o: flag
do
    case "${flag}" in
        h) DB_HOST=${OPTARG};;
        p) DB_PORT=${OPTARG};;
        u) DB_USER=${OPTARG};;
        d) DB_NAME=${OPTARG};;
        f) filename=${OPTARG};;
        o) output=${OPTARG};;
    esac
done

checkDBConnectionData () {
    if [ -z $DB_HOST ]; then exit "DB Host is required. Set flag -h for db host."; fi
    if [ -z $DB_PORT ]; then exit "DB port is required. Set flag -p for db port."; fi
    if [ -z $DB_USER ]; then exit "DB user is required. Set flag -u for db user."; fi
    if [ -z $DB_NAME ]; then exit "DB name is required. Set flag -d for db name."; fi
}

testSelectAllTables () {
    # Test with select query
    SHOW_TABLES_QUERY="select table_name, table_schema from information_schema.tables where table_schema = 'public';"
    echo $SHOW_TABLES_QUERY
    echo $SHOW_TABLES_QUERY | psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME
}

exportRawDataToDB () {
    checkDBConnectionData

    if [ -z $filename ]
    then
        echo "filename is required. Use flag -f <name-of-your-shape-files>"
        exit "filename is required. Use flag -f <name-of-your-shape-files>"
    fi

    if [ -z $output ]
    then
        exit "output table name is required. Use flag -o <table-name>"
    fi

    # Create query
    SQL_QUERY=$(shp2pgsql -s 4326 $filename $output)
    # Running query into database
    echo $SQL_QUERY | psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME
}


echo "Running export shape file to $DB_USER@$DB_HOST:$DB_PORT/$DB_NAME"
printf "\n"

echo "Database Host: $DB_HOST"
echo "Database Name: $DB_NAME"
echo "Database port: $DB_PORT"
echo "Database User: $DB_USER"
printf "\n"

exportRawDataToDB


