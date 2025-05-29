export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const validateTodo = (text) => {
  return !!text && text.trim().length > 0;
};