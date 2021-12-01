PACKAGES=$(shell go list ./... | grep -v '/joltifyChaind')
COVERAGE="coverage.out"

#VERSION := $(shell echo $(shell git describe --tags) | sed 's/^v//')
VERSION= $(shell cat version.txt)
COMMIT := $(shell git log -1 --format='%H')

ldflags = -X github.com/cosmos/cosmos-sdk/version.Name=joltifyChain \
	-X github.com/cosmos/cosmos-sdk/version.ServerName=joltifyChaind \
	-X github.com/cosmos/cosmos-sdk/version.Version=$(VERSION) \
	-X github.com/cosmos/cosmos-sdk/version.Commit=$(COMMIT) 

BUILD_FLAGS := -ldflags '$(ldflags)'

all: install

install: go.sum
	@echo "--> Installing joltifyChaind(version $(VERSION))"
	@go install -mod=readonly $(BUILD_FLAGS) ./cmd/joltifyChaind

protoc:
	@echo "--->build the protoc"
	@starport generate proto-go

build: go.sum
	@echo "--> build joltifyChaind"
	@go build -mod=readonly $(BUILD_FLAGS) ./cmd/joltifyChaind

go.sum: go.mod
	@echo "--> Ensure dependencies have not been modified"
	GO111MODULE=on go mod verify

test:
	@go test -v -mod=readonly $(PACKAGES) -coverprofile=$(COVERAGE) -covermode=atomic

lint:
	@echo "run go lint"
	@golangci-lint run --out-format=tab
