在树莓派上Nginx+Flask+uWSGI搭建服务器，可以直接在网页查看树莓派的摄像头内容以及控制步进电机带动摄像头转向。使用了https://github.com/phoboslab/jsmpeg 来生成视频流


第一步:
~~~
cd jsmpeg
node websocket-relay.js password 8081 8082
~~~
第二步:
~~~
ffmpeg -f v4l2 -framerate 25 -video_size 640x480 -i /dev/video0 -f mpegts -codec:v mpeg1video -s 640x480 -b:v 1000k -bf 0 http://127.0.0.1:8081/password
~~~
第三步:
~~~
sudo uwsgi_python -x Flask_video/flasksite.xml
~~~
