from flask import Flask, render_template, Response, request
from camera import Camera
from Motor import setup, backward, forward, stop, destroy


setup()
app = Flask(__name__)


@app.route('/')
def index():
    """Video streaming home page."""
    return render_template('index.html')


def gen(camera):
    """Video streaming generator function."""
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/video_feed')
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(gen(Camera()), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/forward')
def forward():
    angle = int(float(request.args.get("angle", "")))
    forward(4*angle)
    stop()
    return 'success'


@app.route('/backward')
def backward():
    angle = int(float(request.args.get("angle", "")))
    backward(4*angle)
    stop()
    return 'success'


if __name__ == '__main__':
    try:
        app.run(host='127.0.0.1', port=5005, threaded=True)
    except KeyboardInterrupt:  # When 'Ctrl+C' is pressed, the child function destroy() will be  executed.
        destroy()
