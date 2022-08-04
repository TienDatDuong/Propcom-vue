<template>
  <div class="footer">
    <div class="home-layout-footer unselectable">
      <div class="d-flex justify-content-center">
        <span class="home-layout-footer__sub-title"
          >Đồng hành cùng Propcom trên cơ sở phát triển đôi bên cùng có lợi và cung cấp những sản phẩm dịch vụ tốt nhất
          đến với khách hàng.</span
        >
      </div>
      <div class="home-layout-footer__section-contact">
        <div class="container-xl d-flex">
          <div class="home-layout-footer__section-contact__half-section">
            <div class="home-layout-footer__item">
              <div class="home-layout-footer__item__icon">
                <img src="@/assets/icons/colorful/footer_icon_fill_phone.svg" />
              </div>
              <div class="home-layout-footer__item__text">
                <span class="home-layout-footer__item__text__title">
                  <span class="hotline">Hotline:</span> <a href="tel:0937055368">0937 055 368</a>
                </span>
              </div>
            </div>
            <div class="home-layout-footer__item">
              <div class="home-layout-footer__item__icon">
                <img src="@/assets/icons/colorful/footer_icon_fill_faq.svg" />
              </div>
              <div class="home-layout-footer__item__text">
                <a href="https://hotro.propcom.vn" class="home-layout-footer__item__text__title">
                  Hỗ trợ trải nghiệm dễ dàng
                </a>
              </div>
            </div>
          </div>

          <div
            class="home-layout-footer__section-contact__half-section home-layout-footer__section-contact__half-section--right"
          >
            <span class="home-layout-footer__item-social__text">Theo dõi chúng tôi qua:</span>
            <a
              target="_blank"
              href="https://www.facebook.com/PropertyComnunity"
              class="home-layout-footer__item-social__link"
            >
              <div class="home-layout-footer__item-social">
                <img src="@/assets/icons/colorful/footer_icon_social_fb.svg" />
              </div>
            </a>
            <a
              target="_blank"
              href="https://www.youtube.com/channel/UCZDxqklKKimLD84FTO80KsQ"
              class="home-layout-footer__item-social__link"
            >
              <div class="home-layout-footer__item-social youtube">
                <img src="@/assets/icons/colorful/footer_icon_social_youtube.svg" />
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="home-layout-footer__section-social">
        <div class="container-xl d-flex justify-content-center">
          <div class="d-flex align-items-center">
            <span class="home-layout-footer__sub-title">COPYRIGHT © Propcom</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.justify-content-center {
  height: 42px;
}
.container-xl {
  max-width: 1274px;
}
.hotline {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 130%;
  /* or 19px */

  /* Neutral/ N7 */

  color: #0f0f0f;
}
.footer {
}
.home-layout-footer {
  width: 100%;
  // position: fixed;
  // bottom: 0;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  border-top: $border;

  &__sub-title {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 130%;
    /* identical to box height, or 16px */

    /* Neutral/ N6 */

    color: #5a5a5a;
    padding: 14px 0 13px 0;
  }

  &__section-contact {
    height: 105px;
    background: #f2f2f2;
    display: flex;
    flex-direction: row;
    align-items: center;
    &__half-section {
      flex: 1;
      display: flex;
      align-items: center;
      &--right {
        flex-direction: row;
        justify-content: flex-end;
      }
    }
  }

  &__section-social {
    height: 42px;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__item {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &__icon {
      width: 48.29px;
      height: 48.29px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      background: $colorActive;
      margin-right: 16px;
      img {
        width: 30px;
      }
    }
    &__text {
      width: 200px;
      display: flex;
      flex-direction: column;
      &__title,
      a {
        color: #0f0f0f;
        font-size: 16px;
        font-weight: 700;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      &__sub-title {
        color: #a7a7a7;
        font-size: 12px;
      }
    }
  }

  &__item-social {
    margin-left: 5px;
    cursor: pointer;
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: $border;
    background: #ffffff;
    transition: 0.3s;
    &:hover,
    &:focus {
      background: #ffd6d3;
    }
    &__link {
      display: flex;
    }
    &__text {
      font-size: 15px;
      color: #0f0f0f;
    }
  }
  .youtube {
    background: #ffd6d3;
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeLayoutFooter',
});
</script>
