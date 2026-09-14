ARG NODE_VERSION=24.20

FROM node:${NODE_VERSION}-alpine

RUN apk --no-cache add \
      g++ \
      ca-certificates \
      lz4-dev \
      musl-dev \
      cyrus-sasl-dev \
      openssl-dev \
      make \
      python3 \
      bash

RUN apk add --no-cache --virtual .build-deps gcc zlib-dev libc-dev bsd-compat-headers py-setuptools bash
