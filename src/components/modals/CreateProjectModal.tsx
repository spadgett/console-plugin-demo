import { useCallback, useState } from 'react'
import {
  Alert,
  Button,
  Form,
  FormAlert,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalVariant,
  Spinner,
  TextArea,
  TextInput,
} from '@patternfly/react-core';
import { k8sCreate } from '@openshift-console/dynamic-plugin-sdk';
import { K8sModel } from '@openshift-console/dynamic-plugin-sdk/lib/api/common-types';

const CreateProjectModal = ({ closeModal }) => {
  const [name, setName] = useState<string>('');
  const [displayName, setDisplayName] = useState('');
  const [description, setDescription] = useState('');
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  const thenPromise = (res) => {
    setInProgress(false);
    setErrorMessage('');
    return res;
  };

  const catchError = (error) => {
    const err = error.message || 'An error occurred. Please try again.';
    setInProgress(false);
    setErrorMessage(err);
    return Promise.reject(err);
  };

  const handlePromise = (promise) => {
    setInProgress(true);

    return promise.then(
      (res) => thenPromise(res),
      (error) => catchError(error),
    );
  };

  const createProject = useCallback(async () => {
    const data = {
      metadata: {
        name,
      },
      displayName,
      description,
    };
    return k8sCreate({ model: ProjectRequestModel, data });
  }, [description, displayName, name]);

  const create = () => {
    handlePromise(createProject())
      .then(closeModal)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(`Failed to create Project:`, err);
      });
  };

  return (
    <Modal variant={ModalVariant.small} isOpen onClose={closeModal}>
      <ModalHeader
        title="Create Project"
        description="This modal is created with an extension."
      />
      <ModalBody>
        <Form>
          <FormGroup label="Name" isRequired fieldId="input-name">
            <TextInput
              id="input-name"
              data-test="input-name"
              name="name"
              type="text"
              onChange={(e, v) => setName(v)}
              value={name || ''}
              autoFocus
              required
            />
          </FormGroup>
          <FormGroup label="Display Name" fieldId="input-display-name">
            <TextInput
              id="input-display-name"
              name="displayName"
              type="text"
              onChange={(e, v) => setDisplayName(v)}
              value={displayName || ''}
            />
          </FormGroup>
          <FormGroup label="Description" fieldId="input-description">
            <TextArea
              id="input-description"
              name="description"
              onChange={(e, v) => setDescription(v)}
              value={description || ''}
            />
          </FormGroup>
          {errorMessage && (
            <FormAlert>
              <Alert
                isInline
                variant="danger"
                title="An error occurred"
                data-test="alert-error"
              >
                {errorMessage}
              </Alert>
            </FormAlert>
          )}
        </Form>
      </ModalBody>
      <ModalFooter>
        {inProgress
          ? [<Spinner key="foo" />]
          : [
              <Button key="create" variant="primary" onClick={create}>
                Create
              </Button>,
              <Button key="cancel" variant="link" onClick={closeModal}>
                Cancel
              </Button>,
            ]}
      </ModalFooter>
    </Modal>
  );
};

const ProjectRequestModel: K8sModel = {
  apiVersion: 'v1',
  apiGroup: 'project.openshift.io',
  label: 'ProjectRequest',
  labelKey: 'ProjectRequest',
  plural: 'projectrequests',
  abbr: '',
  kind: 'ProjectRequest',
  id: 'projectrequest',
  labelPlural: 'ProjectRequests',
  labelPluralKey: 'ProjectRequests',
};

export default CreateProjectModal;