'use strict';

function createContainer(props) {
  const container = document.createElement(props.containerSelector || 'div');
  container.className = props.className;

  return {
    render(host) {
      props.children && props.children.forEach(x => x.render(container));
      host.appendChild(container);
    }
  }
}

function createContainerWithTitle(props) {
  const container = document.createElement(props.containerSelector || 'div');
  container.className = props.className;
  const title = document.createElement(props.titleSelector || 'h1');
  title.innerText = props.title;

  return {
    render(host) {
      container.appendChild(title);
      props.children && props.children.forEach(x => x.render(container));
      host.appendChild(container);
    },
    getValue: function () {
      return props.children && props.children.map(x => x.getValue());
    }
  }
}

function createInput() {
  const input = document.createElement('input');

  return {
    render: function (host) {
      host.appendChild(input);
    },
    getValue: function () {
      return input.value;
    }
  }
}

function createSelect(props) {
  const select = document.createElement('select');
  if (props.multiple) {
    select.setAttribute('multiple', 'multiple');
  }

  return {
    render: function (host) {
      props.options.forEach(x => {
        const option = document.createElement('option');
        option.text = x;
        option.value = x;
        select.add(option);
      });
      host.appendChild(select);
    },
    getValue: function () {
      return props.multiple
        ? Array.prototype.map.call(select.selectedOptions, o => o.value)
        : select.value;
    }
  }
}

function createCheckbox(props) {
  const checkbox = document.createElement('span');
  checkbox.className = props.checked ? 'checkbox checkbox--checked' : 'checkbox checkbox--unchecked';
  checkbox.innerText = props.checked ? '[X]' : '[ ]';
  checkbox.addEventListener('click', props.onclick);

  return {
    render: function (host) {
      host.appendChild(checkbox);
    }
  }
}

function createLabel(props) {
  const label = document.createElement('span');
  label.className = props.className;
  label.innerText = props.label;

  if (props.onclick) {
    label.addEventListener('click', props.onclick);
  }

  return {
    render: function (host) {
      host.appendChild(label);
    }
  }
}

function createButton(props) {
  const button = document.createElement('span');
  button.className = 'button';
  button.innerText = props.label;
  button.addEventListener('click', props.onclick);

  return {
    render: function (host) {
      host.appendChild(button);
    }
  }
}