# defaul shell
SHELL = /bin/bash

# Rule "help"
.PHONY: help
.SILENT: help
help:
	echo "Uso make [param]"
	echo "param:"
	echo ""
	echo "push-image  	  - sobe image para dockerhub "
	echo "build-image  	  - cria a imagem "
	echo "kill-nones  	  - apaga imagens sem tag "
	echo ""
	echo ""
	echo "help		      - show this message"

push-image:
	docker tag homebudget-app:0.0.1 jfrossetto/homebudget-app:0.0.1
	docker push jfrossetto/homebudget-app:0.0.1

build-image:
	ng build --prod --base-href /homebudget/ --deploy-url /homebudget/
	docker rmi -f jfrossetto/homebudget-app:0.0.1
	docker build --force-rm -t homebudget-app:0.0.1 .

kill-nones:
	docker images | grep none | awk '{print $3}' | xargs docker rmi
