import React, { useCallback } from "react";
import { Form, Input, Button } from "antd";
import { FormProps } from "antd/lib/form";
import styled from "styled-components";
import useSearchPath from "../hooks/useSearchPath";
import { usePathContext } from "../hooks/usePathContext";
import { apiClient } from "../utils/apiClient";

const { Item: FormItem } = Form;

const FormWrapper = styled.div`
  padding: 24px;
  width: 25%;
  min-width: 250px;
  @media (max-width: 768px) {
    width: 100%;
    height: 35vh;
    min-width: 0px;
    padding: 12px;
  }
`;

const StyledButton = styled(Button)`
  margin-right: 8px;
`;

const SummaryWrapper = styled.div`
  padding-bottom: 8px;
  margin-bottom: 24px;
`;

const LocationForm = React.memo((props: FormProps) => {
  const { fetch, isLoading } = useSearchPath(apiClient);
  const { setData, data } = usePathContext();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      props.form!.validateFields((err, values) => {
        if (!err) fetch(values);
      });
    },
    [props.form, fetch]
  );

  const handleReset = useCallback(() => {
    props.form!.resetFields();
    setData(undefined);
  }, [props.form]);

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
        {data && data.total_distance && data.total_time && (
          <SummaryWrapper>
            <div>total distance: {data.total_distance}</div>
            <div>total time: {data.total_time}</div>
          </SummaryWrapper>
        )}
        <FormItem>
          <StyledButton type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </StyledButton>
          <StyledButton loading={isLoading} onClick={handleReset}>
            Reset
          </StyledButton>
        </FormItem>
      </Form>
    </FormWrapper>
  );
});

export default Form.create()(LocationForm);
