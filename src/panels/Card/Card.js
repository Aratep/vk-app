import React from 'react';
import { connect } from 'react-redux'
import {Alert,ActionSheetItem, ActionSheet, Panel, Input, Button, FormLayoutGroup, Div, FormLayout, PanelHeader, HeaderButton, Group, InfoRow } from '@vkontakte/vkui';
import AudioPlayer from '../../react-h5-audio-player';
import vkconnect from '@vkontakte/vkui-connect';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import MoneyCircleIcon from '@vkontakte/icons/dist/24/money_circle'
import HelpIcon from '@vkontakte/icons/dist/24/help_outline'
import { IOS, platform } from '@vkontakte/vkui';
import logo from '../../img/logo.png'
import money from '../../img/money.png'
import { Base64 } from 'js-base64';
import sha1 from 'js-sha1';
import md5 from 'md5';
import './Card.css'

const osname = platform();

class Card extends React.Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props)

        this.props = props
        // const { card } = this.props.state.card

        this.state = {
            userEmail: '',
            phone: '',
            date: '',
            errors: {},
            modalText: '',
            popout: null,
            tooltip: false,
            currentDate: '',
            isOpen: false
        };

        this.player = ''

    }

    componentDidMount() {

        vkconnect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetEmailResult':
                    this.setState({ userEmail: e.detail.data.email });
                    break;

                case 'VKWebAppOpenPayFormResult':
                    this.setState({ userEmail: "22" });
                    break;
                default:
                    console.log(e.detail.type);
            }
        });

        

        //this.auth(333, "test", "test", 1)
        this.handleValidation();

        this.getCurrentDate();
    }

    correctDateFormat = (arg) => {
        if(arg < 10) {
            arg = '0'+arg
        }
        return arg;
    }

    getCurrentDate = () => {
        const _currentDate = new Date();
        const year = _currentDate.getFullYear();
        const month =  this.correctDateFormat(_currentDate.getMonth() + 1);
        const day =  this.correctDateFormat(_currentDate.getDate());
        const hours =  this.correctDateFormat(_currentDate.getHours());
        const minutes = this.correctDateFormat(_currentDate.getMinutes());

        const currentDateFormat = `${year}-${month}-${day}T${hours}:${minutes}`
        this.setState({currentDate:currentDateFormat})
    }

    getEmail() {
        vkconnect.send("VKWebAppGetEmail", {});
    }

    onChange = (e) => {
      const target = e.target;
      const name = target.name;
      const value = target.value;

      this.setState({
         [name]: value
       });
      
    }
    
    // openSheet = (modalText = '') => {
    //     this.setState({ popout:
    //       <Alert state={{zIndex: 999, position: 'absolute'}}
    //         actions={[{
    //           title: 'Close',
    //           autoclose: true,
    //           style: 'destructive'
    //         }]}
    //         onClose={ () => this.setState({ popout: null }) }
    //       >
    //         {modalText || this.state.modalText}
    //       </Alert>
    //     });
    //     console.log(this.state.modalText)
    // }

    handleValidation = () => {
        let {phone, userEmail, date} = this.state
        let errors = {};
        let isFormValid = true;
        let isFormEmpty = false;
        var phoneReg = /^\+\d+$/;
        const emailReg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i


        if (!phone || !userEmail || !date ||(phone && phone === '+')) {
            isFormEmpty = true;
            isFormValid = false;

            this.setState({modalText:  "заполните форм"});
        }

        if (userEmail && !userEmail.match(emailReg)) {
          isFormValid = false;
          errors.email = "пример example@gmail.com";
        }

        if (phone && !phone.match(phoneReg)) {
          isFormValid = false;
          errors.phone = "только цыфры";
        }

        this.setState({errors: errors});
        return {isFormValid, isFormEmpty};
    }

    onFocus = () => {
      this.setState({phone: '+'})
    }

    buy = (e) => {
        e.preventDefault()
        const formStatus = this.handleValidation()
        console.log(formStatus)

        const amount = 1;
        const order_id = Date.now()
        const ts = parseInt(Date.now() / 1000)
        const app_id = 6758519
        const merchant_id = 807333
        const secret_key = 'iOVTwVLUPuFXzTBcERO8'

        let data = {
            order_id: order_id + "",
            ts: ts + "",
            amount: amount,
            currency: "RUB",
        }

        data.merchant_data = Base64.encode(JSON.stringify(data));
        data.merchant_sign = sha1(data.merchant_data + '3c181bf704de5deb24a7c1ee05e7c783e030b3ad');

        delete data['amount']

        let params = {
            amount: amount,
            data: data,
            description: "тестовый платеж",
            action: "pay-to-service",
            merchant_id: merchant_id,
        }

        let str = `amount=${amount}data={"order_id":"${order_id}","ts":"${ts}","currency":"RUB","merchant_data":"${data.merchant_data}","merchant_sign":"${data.merchant_sign}"}description=тестовый платежmerchant_id=${merchant_id}${secret_key}`
        params.sign = md5(str)

        if(formStatus.isFormValid === true) {
          vkconnect.send("VKWebAppOpenPayForm",
            { "app_id": app_id, "action": "pay-to-service", "params": params }
          );
          this.setState({
            phone:'',
            userEmail:'',
            date:'',
            isOpen: true,
            modalText: 'Покупка совершена'
          })
        //   this.openSheet('Покупка совершена');

        }
        if(formStatus.isFormEmpty === true && !formStatus.isFormValid === true) {
        //   this.openSheet();
          this.setState({isOpen: true})
        }

    }

    onOpenTooltip = () => {
      this.setState(prevState => ({
        tooltip: !prevState.tooltip
      }));
    }

    onCloseTooltip = () => {
      this.setState({tooltip: false})
    }

    render() {
        const { card } = this.props.state.card
        const { errors, phone, userEmail, tooltip, currentDate} = this.state;
        let { date } = this.state;
        
        let app_links = null
        
        if (osname === IOS){
            app_links = this.props.state.responseObj.responseObj.info ? this.props.state.responseObj.responseObj.info.app_links.ios : ''
        }
        else{
            app_links = this.props.state.responseObj.responseObj.info ? this.props.state.responseObj.responseObj.info.app_links.android : ''
        }
        

        return (

            <Panel id="card" className='card'>

                <PanelHeader left={<HeaderButton onClick={this.props.go} data-to="catalog">
                    {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                </HeaderButton>}><img className="header-img" src={logo} alt="Persik The Cat" />
                </PanelHeader>

                <Group>

                    {
                        card.map(item => {
                            const audio_link = `https://s.voicecards.ru/c/${item.id}.mp3`

                            return <Div key={Date.now() + ""} className="audio-div">

                                <div className='audio-title'>
                                  {item.name}
                                </div>
                                 <AudioPlayer onChange={this.onChange} ref={c => (this.player = c)}  title={item.name} src={audio_link} />
                                 <div className='circle'></div>
                               
                            </Div>
                        })
                    }
                </Group>
                <Alert 
                    style={{
                        display: this.state.isOpen ? 'block' : 'none'
                    }}
                    actions={[{
                    title: 'Close',
                    autoclose: true,
                    style: 'destructive'
                    }]}
                    onClose={ () => this.setState({ isOpen: false }) }
                >
                    {this.state.modalText}
                </Alert>
                <Group>
                    <FormLayout>
                        <FormLayoutGroup top="Номер телефона получателя">
                            <Input
                               name='phone'
                               style={{marginBottom: 4}}
                               value={phone}
                               onFocus={this.onFocus}
                               onChange={this.onChange}
                               placeholder="+79990001122"
                               type="tel" />
                               <span className="notice-text">
                                   На этот номер будет доставлена открытка
                               </span><br/>
                               <span className='error-message'>
                                {errors.phone}
                               </span>
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Дата и время доставки">
                            <Input
                                name='date'
                                style={{marginBottom: 4}}
                                value={date === '' ? currentDate : date}
                                onChange={this.onChange}
                                min={currentDate}
                                placeholder={currentDate}
                                type="datetime-local" />
                                <span className="notice-text">
                                    Укажите московское время
                                </span><br/>
                                <span className='error-message'>
                                 {errors.date}
                                </span>
                        </FormLayoutGroup>

                        <FormLayoutGroup top="Email">
                            <Input type="email"
                              name='userEmail'
                              style={{marginBottom: 4}}
                              placeholder='example@gmail.com'
                              value={userEmail}
                              onChange={this.onChange}
                              onFocus={this.getEmail}  />
                              <span className="notice-text">
                                  На указанный адрес поступит отчёт о доставке
                              </span><br/>
                              <span className='error-message'>
                               {errors.email}
                              </span>
                        </FormLayoutGroup>
                    </FormLayout>
                </Group>
                <Group title="Оплата">

                <Div >
                    <InfoRow className='price-info' title="Цена за доставку одной открытки">

                      <HelpIcon className="icon-help" onClick={this.onOpenTooltip} />
                        200 <img src={money} style={{height: '12px'}} alt='money'/>
                        <div
                           style={{
                             display: tooltip ? 'block' : 'none'
                           }}
                           className='custom-tooltip'
                           onClick={this.onCloseTooltip} >
                          <span className='tooltiptext'>
                            Хочешь бесплатную открытку?
                            Скачай наше мобильное приложение. Ссылка ниже
                          </span>
                        </div>
                    </InfoRow>

                    <InfoRow className='price-info' title="Кэшбэк">
                        20 <img src={money} style={{height: '12px'}} alt='money'/>
                    </InfoRow>
                    <Button  size="xl" level="commerce" onClick={this.buy} >
                      <MoneyCircleIcon className="money-icon"/>
                      Отправить
                    </Button>
                    <p align='center'>После оплаты открытка будет доставлена в указанное время</p>
                    <Button className='download-app' component="a" href={app_links}>Скачать приложение</Button>
                    </Div>
                </Group>

            </Panel>)
    }


}

export default connect(
    state => ({ state })
)(Card)

