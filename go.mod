module gitlab.com/joltify/joltifychain

go 1.16

require (
	github.com/cosmos/cosmos-sdk v0.45.3
	github.com/cosmos/iavl v0.17.3
	github.com/cosmos/ibc-go/v2 v2.0.3
	github.com/dgraph-io/badger/v2 v2.2007.3 // indirect
	github.com/ethereum/go-ethereum v1.9.25
	github.com/gin-gonic/gin v1.7.0 // indirect
	github.com/go-git/go-git/v5 v5.4.2 // indirect
	github.com/gogo/protobuf v1.3.3
	github.com/golang/protobuf v1.5.2
	github.com/google/go-cmp v0.5.8 // indirect
	github.com/gorilla/mux v1.8.0
	github.com/grpc-ecosystem/grpc-gateway v1.16.0
	github.com/grpc-ecosystem/grpc-gateway/v2 v2.10.2 // indirect
	github.com/ignite-hq/cli v0.20.0
	github.com/kr/pretty v0.3.0 // indirect
	github.com/magiconair/properties v1.8.6 // indirect
	github.com/matryer/is v1.4.0 // indirect
	github.com/onsi/gomega v1.18.1 // indirect
	github.com/prometheus/common v0.33.0 // indirect
	github.com/regen-network/cosmos-proto v0.3.1
	github.com/rogpeppe/go-internal v1.8.1 // indirect
	github.com/rs/zerolog v1.26.0 // indirect
	github.com/spf13/cast v1.4.1
	github.com/spf13/cobra v1.4.0
	github.com/spf13/pflag v1.0.5
	github.com/stretchr/objx v0.3.0 // indirect
	github.com/stretchr/testify v1.7.1
	github.com/tendermint/spm v0.1.8
	github.com/tendermint/spn v0.1.1-0.20220407154406-5cfd1bf28150
	github.com/tendermint/tendermint v0.34.19
	github.com/tendermint/tm-db v0.6.6
	golang.org/x/crypto v0.0.0-20220214200702-86341886e292
	golang.org/x/mod v0.6.0-dev.0.20220106191415-9b9b3d81d5e3 // indirect
	golang.org/x/sys v0.0.0-20220209214540-3681064d5158 // indirect
	google.golang.org/genproto v0.0.0-20220519153652-3a47de7e79bd
	google.golang.org/grpc v1.46.2
	google.golang.org/protobuf v1.28.0
	gopkg.in/yaml.v2 v2.4.0
)

replace (
	github.com/gogo/protobuf => github.com/regen-network/protobuf v1.3.3-alpha.regen.1
	github.com/keybase/go-keychain => github.com/99designs/go-keychain v0.0.0-20191008050251-8e49817e8af4
	google.golang.org/grpc => google.golang.org/grpc v1.33.2
)
