FROM gcc:latest AS cpp
WORKDIR /app
COPY ./codes /app/codes


FROM python:latest AS python
WORKDIR /app
COPY --from=cpp /app/codes /app/codes