import React, { useCallback } from "react";
import { Form, Input, Button } from "antd";
import { FormProps } from "antd/lib/form";
import styled from "styled-components";
import useSearchPath from "../hooks/useSearchPath";
import { usePathContext } from "../hooks/usePathContext";

const { Item: FormItem } = Form;

const FormWrapper = styled.div`
  padding: 24px;
  min-width: 350px;
`;

const LocationForm = React.memo((props: FormProps) => {
  const { fetch, isLoading } = useSearchPath();
  const { data } = usePathContext();
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      props.form!.validateFields((err, values) => {
        if (!err) {
          fetch(values);
        }
      });
    },
    [props.form, fetch]
  );

  const getFieldDecorator = props.form!.getFieldDecorator;
  return (
    <FormWrapper>
      <Form layout="vertical" onSubmit={handleSubmit}>
        <FormItem label="Starting location">
          {getFieldDecorator("origin", {
            rules: [
              { required: true, message: "Please input a starting location." }
            ]
          })(<Input allowClear />)}
        </FormItem>
        <FormItem label="Drop-off point">
          {getFieldDecorator("destination", {
            rules: [
              { required: true, message: "Please input a drop-off point." }
            ]
          })(<Input allowClear />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </FormItem>
      </Form>
    </FormWrapper>
  );
});

export default Form.create()(LocationForm);
