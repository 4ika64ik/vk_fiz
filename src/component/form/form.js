import axios from 'axios';
import s from './form.module.scss'
import { useState } from 'react';

function Form(props) {
  const token = '6806809280:AAFqNvMpRw2ZsyyuFIpzoLd331rvHR1y4mQ';
  const chat_id = '-1002107069189';
  const URI_API = `https://api.telegram.org/bot${token}/sendMessage`;

  const [restorel, setRestorel] = useState(false);
  const restorelButtonClick = () => {
    setRestorel(true);

    setTimeout(() => {
      setRestorel(false);
    }, 7000);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const social = formData.get('social')

    let message = `Водила в семью!\nИмя: ${ name }\nНомер: ${ phone }\nМессенджер: ${ social }`

    axios.post(URI_API, {
      chat_id: chat_id,
      parse_mode: 'html',
      text: message
    })
    .then(() => {
      e.target.reset();
      restorelButtonClick();
    })
    .catch(error => {
      console.error('Форма не отправлена', error);
    });

  };

  return (
          <div className={s.form}>
            <div className={s.form__container}>
              <form className={s.form__form} id='tg' onSubmit={handleSubmit}>
                <input className={s.form__input} type='name' name="name" placeholder='Имя' required/>
                <input className={s.form__input} type='name' name="phone" placeholder='Номер телеграм/ватсап' required/>
                <div>Как удобнее связаться с Вами?</div>

                <label>
                  <input className={s.form__radio} type='radio' name='social' required value={'WhatsApp или Telegram'}/>
                  WhatsApp или Telegram
                </label>
                <label>
                  <input className={s.form__radio} type='radio' name='social' required value={'Вайбер'}/>
                  Вайбер
                </label>
                <label>
                  <input className={s.form__radio} type='radio' name='social' value={'Нету WhatsApp, Telegram, Вайбер'}/>
                  Нету WhatsApp, Telegram или Вайбер
                </label>

                <button className={s.form__button} type='submit'>{props.butt ? ('Отправить') : ('Оставить заявку')}</button>
                {restorel && <div className={s.form__true}><p className={s.form__true_info}>С Вами свяжется специалист</p></div>}
              </form>
              <p className={s.form__accept}>Нажимая на кнопку, вы принимаете <a href="/" target="_blank">Положение</a> и <a href="/" target="_blank">Согласие</a> на обработку персональных данных.</p>
              <p className={s.form__accept}>Мы не передаем данные третьим лицам.</p>
            </div>
          </div>
  );
}

export default Form;