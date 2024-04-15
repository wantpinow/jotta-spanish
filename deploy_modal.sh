cd python

# deploy models
find deployments -maxdepth 2 -type f -path '*/stub.py' -exec sh -c 'poetry run modal deploy --env ${MODAL_ENV} deployments.$(basename $(dirname {})).stub' \;

# deploy router
poetry run modal deploy --env ${MODAL_ENV} router