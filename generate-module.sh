#!/bin/bash

nest g module $1 --no-spec
nest g controller $1 --no-spec
nest g service $1 --no-spec