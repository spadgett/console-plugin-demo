import Helmet from 'react-helmet';
import { Content, PageSection, Title } from '@patternfly/react-core';
import { CheckCircleIcon } from '@patternfly/react-icons';

export default function ExamplePage() {
  return (
    <>
      <Helmet>
        <title data-test="example-page-title">Hello, Plugin!</title>
      </Helmet>
      <PageSection>
        <Title headingLevel="h1">Hello, Plugin!</Title>
      </PageSection>
      <PageSection>
        <Content component="p">
          <CheckCircleIcon /> Success!
          Your plugin is working.
        </Content>
        <Content component="p">
            This is a custom page contributed by the console plugin template.
            The extension that adds the page is declared in
            console-extensions.json in the project root along with the
            corresponding nav item. Update console-extensions.json to change or
            add extensions. Code references in console-extensions.json must have
            a corresponding property <code>exposedModules</code> in package.json
            mapping the reference to the module.
        </Content>
      </PageSection>
    </>
  );
}
