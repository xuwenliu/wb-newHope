import request from '@/utils/request';

// 数据查询
export async function getDataQueryList(data) {
  return request('/api/data/query', {
    method: 'POST',
    data,
  });
}

// 近红外配置
export async function getDataConfigList(data) {
  return request('/api/data/config', {
    method: 'POST',
    data,
  });
}

export async function addDataConfig(data) {
  return request('/api/data/config/add', {
    method: 'POST',
    data,
  });
}

export async function removeDataConfig(data) {
  return request('/api/data/config/remove', {
    method: 'POST',
    data,
  });
}

export async function updateDataConfig(data) {
  return request('/api/data/config/update', {
    method: 'POST',
    data,
  });
}

// 物料主数据设置
export async function getMaterialMainDataList(data) {
  return request('/api/material/main/data', {
    method: 'POST',
    data,
  });
}

export async function addMaterialMainData(data) {
  return request('/api/material/main/add', {
    method: 'POST',
    data,
  });
}

export async function removeMaterialMainData(data) {
  return request('/api/material/main/remove', {
    method: 'POST',
    data,
  });
}

export async function updateMaterialMainData(data) {
  return request('/api/material/main/update', {
    method: 'POST',
    data,
  });
}

// 物料检测项目设置
export async function getMaterialCheckProjectList(data) {
  return request('/api/material/check/Project', {
    method: 'POST',
    data,
  });
}

export async function addMaterialCheckProject(data) {
  return request('/api/material/check/Project/add', {
    method: 'POST',
    data,
  });
}

export async function removeMaterialCheckProject(data) {
  return request('/api/material/check/Project/remove', {
    method: 'POST',
    data,
  });
}

export async function updateMaterialCheckProject(data) {
  return request('/api/material/check/Project/update', {
    method: 'POST',
    data,
  });
}

// 化验项目设置
export async function getMaterialAssayProjectList(data) {
  return request('/api/assay/Project', {
    method: 'POST',
    data,
  });
}

export async function addMaterialAssayProject(data) {
  return request('/api/assay/Project/add', {
    method: 'POST',
    data,
  });
}

export async function removeMaterialAssayProject(data) {
  return request('/api/assay/Project/remove', {
    method: 'POST',
    data,
  });
}

export async function updateMaterialAssayProject(data) {
  return request('/api/assay/Project/update', {
    method: 'POST',
    data,
  });
}

// 用户管理
export async function getUserList(data) {
  return request('/api/user', {
    method: 'POST',
    data,
  });
}

export async function addUser(data) {
  return request('/api/user/add', {
    method: 'POST',
    data,
  });
}

export async function removeUser(data) {
  return request('/api/user/remove', {
    method: 'POST',
    data,
  });
}

export async function updateUser(data) {
  return request('/api/user/update', {
    method: 'POST',
    data,
  });
}
