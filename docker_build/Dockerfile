# Use the offical node.js image

FROM node:10.15.3-alpine

RUN mkdir /root/work 
WORKDIR /root/work/
RUN apk add git
RUN git clone https://github.com/mganeko/webrtc_1to1_socketio.git
WORKDIR /root/work/webrtc_1to1_socketio
RUN npm install

# use tini for alpine
RUN apk add --no-cache tini
# Tini is now available at /sbin/tini
ENTRYPOINT ["/sbin/tini", "--"]


# Run the web service on container startup.
EXPOSE 8080
CMD [ "node", "server_socketio.js" ]


# --- memo -----

# -- to build ---
#$ docker build -t mganeko/webrtc_socketio .

# -- sh ---
#$ docker run -it mganeko/webrtc_socketio /bin/ash

# -- run --
#$ docker run --init -d -p 8001:8080 --name webrtc mganeko/webrtc_socketio
# --> open http://localhost:8001/

# -- run with PORT env --
#$ docker run --init -d -e PORT=1323 -p 8002:1323 --name webrtc mganeko/webwebrtc_socketio
# --> open http://localhost:8002/

# -- attach with sh --
#$ docker exec -it webrtc /bin/ash

# -- push to Docker Hub (hub.docker.com)
#$ docker push mganeko/webrtc_socketio
