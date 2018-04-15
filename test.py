from picamera import PiCamera
from time import sleep

camera = PiCamera()


def loop():
    camera.start_preview()
    while True:
        for i in range(5):
            camera.start_recording('/home/pi/video/video{}.h264'.format(i))
            sleep(1)
            camera.stop_recording()


if __name__ == '__main__':
    try:
        loop()
    except KeyboardInterrupt:
        camera.stop_preview()