# Dockerfile pour un nœud VeegoxChain (Polygon Edge)
FROM ghcr.io/0xpolygon/polygon-edge:latest
WORKDIR /chain
COPY ./genesis.json ./
COPY ./nodes ./nodes
EXPOSE 8545 8546 10000 9632
CMD ["server", "--data-dir", "./nodes/node1", "--chain", "./genesis.json", "--grpc-address", ":9632", "--libp2p", ":10000", "--jsonrpc", ":8545", "--prometheus", ":9090"]
