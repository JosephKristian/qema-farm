function userReducer(state, action) {
  switch (action.type) {
    case 'retrieve_user': {
      return [...action.data];
    }
    case 'delete_user': {
      return [];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

function goatReducer(state, action) {
  switch (action.type) {
    case 'retrieve_goat': {
      return [...action.data];
    }
    case 'delete_goat': {
      return [];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

function foodReducer(state, action) {
  switch (action.type) {
    case 'retrieve_food': {
      return [...action.data];
    }
    case 'delete_food': {
      return [];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

function maintenanceReducer(state, action) {
  switch (action.type) {
    case 'retrieve_maintenance': {
      return [...action.data];
    }
    case 'delete_maintenance': {
      return [];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

function transactionReducer(state, action) {
  switch (action.type) {
    case 'retrieve_transaction': {
      return [...action.data];
    }
    case 'delete_transaction': {
      return [];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

function packageReducer(state, action) {
  switch (action.type) {
    case 'retrieve_package': {
      return [...action.data];
    }
    case 'delete_package': {
      return [];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

function packageTransactionReducer(state, action) {
  switch (action.type) {
    case 'retrieve_package_transaction': {
      return [...action.data];
    }
    case 'delete_package_transaction': {
      return [];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export { userReducer, goatReducer, foodReducer, maintenanceReducer, transactionReducer, packageReducer, packageTransactionReducer };