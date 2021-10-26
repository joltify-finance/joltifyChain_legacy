PACKAGES=$(shell go list ./... | grep -v '/invoiceChaind')
COVERAGE="coverage.out"

#VERSION := $(shell echo $(shell git describe --tags) | sed 's/^v//')
VERSION= $(shell cat version.txt)
COMMIT := $(shell git log -1 --format='%H')

ldflags = -X github.com/cosmos/cosmos-sdk/version.Name=invoiceChain \
	-X github.com/cosmos/cosmos-sdk/version.ServerName=invoiceChaind \
	-X github.com/cosmos/cosmos-sdk/version.Version=$(VERSION) \
	-X github.com/cosmos/cosmos-sdk/version.Commit=$(COMMIT) 

BUILD_FLAGS := -ldflags '$(ldflags)'

all: install

install: go.sum
	@echo "--> Installing invoiceChaind(version $(VERSION))"
	@go install -mod=readonly $(BUILD_FLAGS) ./cmd/joltifyChaind

build: go.sum
	@echo "--> build invoiceChaind"
	@go build -mod=readonly $(BUILD_FLAGS) ./cmd/joltifyChaind

go.sum: go.mod
	@echo "--> Ensure dependencies have not been modified"
	GO111MODULE=on go mod verify

test:
	@go test -v -mod=readonly $(PACKAGES) -coverprofile=$(COVERAGE) -covermode=atomic

lint:
	@echo "run go lint"
	@golangci-lint run --out-format=tab
