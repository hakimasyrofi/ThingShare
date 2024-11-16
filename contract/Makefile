-include .env

clean:; forge clean

build:; forge build

install:;
	forge install OpenZeppelin/openzeppelin-contracts@v5.0.2 --no-commit --no-git

deploy-sepolia-blockscout:
	forge script script/Deploy.s.sol:Deploy --rpc-url $(SEPOLIA_RPC_URL) --private-key $(DEPLOYER_PRIVATE_KEY) --broadcast --verify --verifier blockscout --verifier-url ${SEPOLIA_BLOCKSCOUT_API_URL} -vvvv