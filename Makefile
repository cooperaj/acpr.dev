REPO ?= cooperaj/acpr

build-arm64v8:
	docker build -f Dockerfile.arm64v8 -t ${REPO}:arm64v8-alpine-latest .

build-amd64:
	docker build -t $(REPO):amd64-alpine-latest .

.PHONY: build-arm64v8 build-amd64 build
build: build-arm64v8 build-amd64

push-arm64v8:
	docker push ${REPO}:arm64v8-alpine-latest

push-amd64:
	docker push ${REPO}:amd64-alpine-latest

.PHONY: push-arm64v8 push-amd64 push
push: push-arm64v8 push-amd64

.PHONY: multiarch
multiarch: build push
	docker manifest create "$(REPO):alpine-latest" \
	"${REPO}:arm64v8-alpine-latest" \
	"${REPO}:amd64-alpine-latest"

	docker manifest annotate "$(REPO):alpine-latest" \
	"${REPO}:arm64v8-alpine-latest" \
	--os=linux --arch=arm --variant=v8

	docker manifest push "$(REPO):alpine-latest"