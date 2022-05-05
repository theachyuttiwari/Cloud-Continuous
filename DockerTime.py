from docker import APIClient
import logging as log
import time

log.basicConfig(
    level=log.INFO, filename="/dev/stdout",
    format="%(levelname)s: %(message)s"
)
cli = APIClient(base_url="unix:///run/docker.sock")

# The container creation process starts here
start = time.time()

container = cli.create_container(image="ubuntu:focal")

end = time.time()

log.info("Time took to create the container: %s seconds." % (end - start))

start = time.time()

cli.start(container.get("Id"))

end = time.time()

log.info("Time took to start the container: %s seconds." % (end - start))
