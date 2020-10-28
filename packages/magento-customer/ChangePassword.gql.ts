// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

export const ChangePasswordDocument: DocumentNode<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ChangePassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'currentPassword' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'newPassword' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
      ],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'changeCustomerPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'currentPassword' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'currentPassword' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'newPassword' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'newPassword' } },
              },
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'default_billing' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'default_shipping' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'id' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'prefix' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'firstname' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'middlename' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastname' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'suffix' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'company' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'vat_id' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'city' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'postcode' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'region' },
                        arguments: [],
                        directives: [],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'region' },
                              arguments: [],
                              directives: [],
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'region_code' },
                              arguments: [],
                              directives: [],
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'street' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'telephone' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'default_billing' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'default_shipping' },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'email' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'prefix' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'firstname' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'middlename' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lastname' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'suffix' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'gender' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'is_subscribed' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'date_of_birth' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'taxvat' },
                  arguments: [],
                  directives: [],
                },
              ],
            },
          },
        ],
      },
    },
  ],
}
export type ChangePasswordMutationVariables = Types.Exact<{
  currentPassword: Types.Scalars['String']
  newPassword: Types.Scalars['String']
}>

export type ChangePasswordMutation = {
  changeCustomerPassword?: Types.Maybe<
    Pick<
      Types.Customer,
      | 'default_billing'
      | 'default_shipping'
      | 'email'
      | 'prefix'
      | 'firstname'
      | 'middlename'
      | 'lastname'
      | 'suffix'
      | 'gender'
      | 'is_subscribed'
      | 'date_of_birth'
      | 'taxvat'
    > & {
      addresses?: Types.Maybe<
        Array<
          Types.Maybe<
            Pick<
              Types.CustomerAddress,
              | 'id'
              | 'prefix'
              | 'firstname'
              | 'middlename'
              | 'lastname'
              | 'suffix'
              | 'company'
              | 'vat_id'
              | 'city'
              | 'postcode'
              | 'street'
              | 'telephone'
              | 'default_billing'
              | 'default_shipping'
            > & {
              region?: Types.Maybe<Pick<Types.CustomerAddressRegion, 'region' | 'region_code'>>
            }
          >
        >
      >
    }
  >
}