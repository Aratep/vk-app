import React from 'react';
import { Panel, Group, Div, PanelHeader, platform, IOS } from '@vkontakte/vkui';
import logo from '../../img/logo.png'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import { HeaderButton } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';


const osname = platform();

class AboutUs extends React.Component {

    constructor(props) {
        super(props)

        this.props = props
    }

    render() {

        return (
            <Panel id="about_us">
                <PanelHeader left={<HeaderButton onClick={this.props.go} data-to="catalog">{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}>
                    <img className="header-img" src={logo} alt='logo'/>
                </PanelHeader>

                <Group title="О нас ">

                    <Div>
                        Добро пожаловать в VK приложение VoiceCards!
                    </Div>

                    <Div>У нас вы можете прослушать и заказать оригинальные голосовые поздравления и розыгрыши, которые отправляются в виде звонка на мобильный или городской телефон. С помощью голосовых открыток VoiceCards уже поздравлено более 3 миллионов человек по всему миру. Не упустите возможность подарить Вашим родным и близким красивые слова, песню или шутку. Просто укажите номер телефона получателя и дату, открытка поступит в удобное для вас время. Установите наше мобильное приложение и получите бесплатную открытку.
Услуга предоставляется ООО "Инкредибл мобайл интертеймент"
                    </Div>
                </Group>
                <Group title="Оплата">
                    <Div>
                        Оплатить открытки вы можете с помощью VK Pay. Просто пополните ваш VK PAY кошелек с помощью банковской карты. При оплате открыток вы получите 10% кешбэк.
                    </Div>
                </Group>
                <Group title="Доставка">
                    <Div>
                        После оплаты заказ будет доставлен в указанное время. Открытка считается доставленной при соединении более 15 секунд. Если абонент недоступен, система сделает 15 попыток дозвониться. Если у Вас есть вопросы по заказам, пожалуйста, обратитесь в нашу <a href="mailto:support@voicecards.ru?subject=VoiceCards::VK Apps&body=Добрый день! У меня вопрос по заказу на номер телефона:">службу поддержки</a>, мы с радостью Вам поможем.
                    </Div>
                </Group>
                <Group title="Условия и документы">
                    <Div>
                        <a href='http://www.voicecards.ru/uslovija-ispolzovanija-servisa' >Пользовательское соглашение</a>
                    </Div>
                    <Div>
                        <a href='http://www.voicecards.ru/privacy_app'>Политика конфиденциальности </a>
                    </Div>
                </Group>
                <Group title="Разработчик">
                    <Div>
                        Pride Media
                    </Div>
                </Group>

            </Panel>)
    }
}

export default AboutUs
