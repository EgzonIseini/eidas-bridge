eIDAS Bridge Library
====================

This repo contains an implementation of an eIDAS Bridge Library in Python.

An eIDAS Bridge links the european Trust and Legal Framework, named eIDAS (electronic IDentification, Authentication and trust Services), with the Self-Sovereign Identification (SSI) global trust framework, based on Decentralized IDentifers, or DIDs.

Quick Start Guide
=================

#### Requirements

- Python 3.6 or higher
- Cryptograhic libraries with RSA support and X509 capabilities
  - In python use `cryptography`, an easy-to-use library that contains the required crypto & x509 functions:
   ```sh
    $ pip install cryptography
    ```

#### Running the included demo

Clone the repository
```sh
$ git clone https://github.com/validatedid/eidas-bridge
```

Move to the new directory
```sh
$ cd eidas-bridge
```

Create and activate python virtual environment:
```sh
$ python3 -m venv env
$ source env/bin/activate
```

Execute `eidas_demo`:
```sh
$ python eidas_demo.py
```

#### Running Pytest suite tests

##### Requeriments
- Pytest

##### Test execution

```sh
$ pytest tests/test_eidas_bridge.py
```

eIDAS API calls
===============

#### eidas_link_did
```python
def eidas_link_did(did, certificate, proof) -> str:
```
Link the Issuer DID with eIDAS certificate.
Receives a DID, an eIDAS certificate, and its proof of possession.
Returns the JSON that needs to be stored on the Agent public Storage (i.e: an Identity Hub)

#### eidas_get_service_endpoint_struct
```python
def eidas_get_service_endpoint_struct(storage_endpoint) -> str:
```
Contructs the JSON structure that needs to be added to the Issuer's DID Document.
Receives a service endpoint where it is stored the issuer's eIDAS and DID linking information and returns the correspondent JSON.

#### eidas_sign_credential
```python
def eidas_sign_credential(json_credential) -> str:
```
Checks the validity of the issuer's eIDAS certificate against a Trusted Service Provider and adds the corresponde response to the received credential JSON structure.

#### eidas_verify_credential
```python
def eidas_verify_credential(json_credential) -> str:
```
Verifies that the credential issuer had a valid eIDAS certificate at the moment of issuing the passed credential.
Returns: VALID or NOT VALID

REQUISITES
==========

1. DID Document needs to be updated with (a new publickey?? and) a new service endpoint linking to the Identity Hub web service where eIDAS key linkage info is stored.
2. Verifiable Credential needs to be updated with a new service endpoint to check the certificate validity (via an OCSP response or via the stored info of the OCSP response at the moment of issuing the credential)
3. An agent MUST have a storage repository with the capability of exposing a public web service endpoint with access control management (i.e. an Identity Hub)
4. The issuer backoffice MUST implement a PKCS#1 from a given hash
5. The issuer backoffice MUST have an eIDAS certificate.

ROADMAP
=======

### Initial Step
- ~~Code the interface eiDAS Bridge API~~
- ~~Code a demo test~~
- ~~Create a repo on Validated github~~
- ~~Create a Readme.md to explain each API call~~

### Step 0
- Code the Unit test for each API function
- Develop the basic functionality for each API call (no outside interaction)
- Expose the API to an Open API / Swapper REST API

### Step 1
- Add external components: Enterprise Agent (no ledger)

### Step 2
- Add external components: User Agent (no ledger)

### Step 3
- Create a basic web front-end to easy test each API

### Step 4
- Build User Agent UI (to make a real demo)
- Build an Enterprise Agent UI

### Step 5
- Add external components:  Identity Hub

### Step 6
- Add external components:  Sidetree on Ethereum

### Step 7
- Use Verifiable Credentials W3C compatible

### Step 8
- CELEBRATE with :beers:

