# FROM python:3.8.7
FROM python:3.8-alpine


WORKDIR /app

ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

COPY . .
# COPY ./requirements.txt /requirements.txt

RUN pwd

RUN pip install -r ./requirements.txt | cat
# RUN pipenv install --skip-lock --system --dev

RUN python manage.py makemigrations
RUN python manage.py migrate

RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static

RUN adduser --disabled-password user
RUN chown -R user:user /vol/
RUN chmod -R 755 /vol/web

EXPOSE 8000

USER user

RUN ls -al && pwd

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

