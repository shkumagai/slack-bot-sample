.PHONY: init
init:
	npm ci

.PHONY: up
up:
	STAGE=dev npm run serve

.PHONY: build
build:
	npm run build

.PHONY: clean
clean: dist-clean
	git clean -fdx

.PHONY: dist-clean
dist-clean:
	@-rm -rf dist
