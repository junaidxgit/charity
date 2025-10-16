document.addEventListener("DOMContentLoaded", () => {
  const quantityControls = document.querySelectorAll(".quantity-control");

  quantityControls.forEach((control) => {
    const input = control.querySelector(".quantity-input");
    const decrement = control.querySelector('[data-action="decrement"]');
    const increment = control.querySelector('[data-action="increment"]');

    if (!input) {
      return;
    }

    const min = parseInt(input.min || "1", 10);
    const max = input.max ? parseInt(input.max, 10) : Number.POSITIVE_INFINITY;

    const clamp = (value) => {
      const numeric = Number(value);
      if (Number.isNaN(numeric)) {
        return min;
      }
      return Math.min(Math.max(numeric, min), max);
    };

    const setValue = (value) => {
      const nextValue = clamp(value);
      input.value = nextValue;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    };

    if (decrement) {
      decrement.addEventListener("click", () => {
        setValue(Number(input.value) - 1);
      });
    }

    if (increment) {
      increment.addEventListener("click", () => {
        setValue(Number(input.value) + 1);
      });
    }

    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^\d]/g, "");
    });

    input.addEventListener("blur", () => {
      setValue(input.value);
    });
  });

  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    const originalText = button.textContent.trim();
    button.dataset.originalText = originalText;

    button.addEventListener("click", () => {
      const overview = button.closest(".product-overview");
      if (!overview) {
        return;
      }

      const quantityInput = overview.querySelector(".quantity-input");
      const statusMessage = overview.querySelector(".add-to-cart__status");
      const productName = button.dataset.productName || "Product";

      const quantity = quantityInput ? Number(quantityInput.value) || 1 : 1;

      button.disabled = true;
      button.textContent = "Adding...";

      window.setTimeout(() => {
        button.disabled = false;
        button.textContent = button.dataset.originalText;

        if (statusMessage) {
          const pluralLabel = button.dataset.productPlural || `${productName}s`;
          const label = quantity > 1 ? pluralLabel : productName;
          statusMessage.textContent = `Added ${quantity} ${label} to your cart.`;
        }
      }, 600);
    });
  });
});
