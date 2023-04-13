#!/bin/bash

scripts/start_backend.sh &
scripts/start_frontend.sh &&
fg
