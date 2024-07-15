/* eslint-disable react-hooks/exhaustive-deps */
import Image from '@/assets/images/section.png';
import CustomSteps from '@/components/CustomSteps';
import StepperContent from '@/components/CustomSteps/components/StepperContent';
import StepperPagination from '@/components/CustomSteps/components/StepperPagination';
import AnonymousSider from '@/components/Images/BackgroundImage';
import PageSkeleton from '@/components/PageSkeleton';
import Header from '@/pages/Auth/Register/components/Header';
import {
  createInvestorResetAction,
  investorCreateAction,
} from '@/store/investor/slice';
import { StateType } from '@/store/root-reducers';
import { mergeResponseErrors } from '@/utils';
import { IPageProps } from '@/utils/route-utils';
import { IStep } from '@/utils/stepper-utils';
import { Col, Form, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  RegisterSteps,
  RegisterStepsMandated,
} from './components/Content/Steps';
import RegisterSuccess from './components/Content/Success';
import './styles.less';

const Register: React.FC<IPageProps> = ({ pageTitle }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const [form] = Form.useForm();
  const { isCreated, email, errors } = useSelector(
    (state: StateType) => state.investor.create
  );
  const { getFieldValue, getFieldsValue, setFields } = form;
  const [activeSteps, setActiveSteps] = useState<IStep[]>(
    RegisterStepsMandated
  );

  const onChange = () => {
    setSelectedProfile(getFieldValue('investorType'));
    if (getFieldValue('hasRepresentative') === false) {
      setActiveSteps(RegisterSteps);
    } else setActiveSteps(RegisterStepsMandated);
  };

  const resetAction = () => dispatch(createInvestorResetAction());

  useEffect(() => {
    if (errors) setFields(mergeResponseErrors(getFieldsValue(), errors));
  }, [getFieldsValue, setFields, errors]);

  useEffect(() => {
    if (errors) resetAction();
  }, []);
  return (
    <PageSkeleton pageTitle={pageTitle} showPageTitle={false}>
      <div className="anonymous-layout">
        <Row>
          <Col sm={0} md={8}>
            <AnonymousSider hasFooter hasTitle={false} image={Image} />
          </Col>
          {isCreated ? (
            <Col sm={24} md={16}>
              <RegisterSuccess email={email} />
            </Col>
          ) : (
            <Col sm={24} md={16} className="layout-scroll">
              <div className="layout-wrapper">
                <Header goBackLink={t('auth.register.header.goBack')} />
                <CustomSteps
                  withStepNumber
                  profile={selectedProfile}
                  stepperTitle={t('auth.register.content.title')}
                  current={current}
                  steps={activeSteps}
                />
              </div>
              <Form
                name="basic"
                layout="vertical"
                autoComplete="off"
                form={form}
                onChange={onChange}
                initialValues={{ hasRepresentative: true }}
              >
                <StepperContent
                  content={activeSteps[current]?.content(form, null)}
                />
                <StepperPagination
                  withHelp
                  form={form}
                  stepsLength={activeSteps.length}
                  current={current}
                  setCurrent={setCurrent}
                  onSubmit={() =>
                    dispatch(
                      investorCreateAction({
                        ...form.getFieldsValue(true),
                      })
                    )
                  }
                />
              </Form>
            </Col>
          )}
        </Row>
      </div>
    </PageSkeleton>
  );
};

export default Register;
