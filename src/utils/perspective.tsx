import { Perspective, ResolvedExtension } from '@openshift-console/dynamic-plugin-sdk';
import testIcon from '../components/test-icon';

export const icon: ResolvedExtension<Perspective>['properties']['icon'] = { default: testIcon };

export const getLandingPageURL: ResolvedExtension<
  Perspective
>['properties']['landingPageURL'] = () => '/k8s/cluster/project.openshift.io~v1~Project';

export const getImportRedirectURL: ResolvedExtension<
  Perspective
>['properties']['importRedirectURL'] = (namespace) =>
  `/k8s/cluster/projects/${namespace}/workloads`;