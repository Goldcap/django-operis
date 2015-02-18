#!/bin/bash

cd ../
rsync -av templates/ember/static/* paom-app/app

exit 0
