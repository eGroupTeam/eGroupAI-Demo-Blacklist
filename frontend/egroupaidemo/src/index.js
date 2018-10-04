const initProject = async () => {
  const React = await import('react');
  const ReactDOM = await import('react-dom');
  const { App } = await import('./App');
  const { register } = await import('./registerServiceWorker');

  await import('semantic-ui-css/semantic.min.css');
  await import('./replace-semantic.css');

  ReactDOM.render(<App />, document.getElementById('root'));
  register();
};

initProject();
