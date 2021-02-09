import request from '@/utils/request';

// 数据查询
export async function getDataQueryList(params) {
  return request('/api/data/query', {
    params,
  });
}

// 近红外配置
export async function getDataConfigList(params) {
  return request('/api/newhope/device/list', {
    params,
  });
}

export async function addDataConfig(data) {
  return request('/api/newhope/device/add', {
    method: 'POST',
    data,
  });
}

export async function removeDataConfig(params) {
  return request('/api/newhope/device/remove', {
    params,
  });
}

export async function updateDataConfig(data) {
  return request('/api/newhope/device/edit', {
    method: 'POST',
    data,
  });
}

// 物料主数据设置
export async function getMaterialMainDataListAll() {
  return request('/api/newhope/material/all');
}

export async function getMaterialMainDataList(params) {
  return request('/api/newhope/material/list', {
    params,
  });
}

export async function addMaterialMainData(data) {
  return request('/api/newhope/material/add', {
    method: 'POST',
    data,
  });
}

export async function removeMaterialMainData(params) {
  return request('/api/newhope/material/remove', {
    params,
  });
}

export async function updateMaterialMainData(data) {
  return request('/api/newhope/material/edit', {
    method: 'POST',
    data,
  });
}

// 物料检测项目设置
export async function getMaterialCheckProjectList(params) {
  return request('/api/newhope/materialInspection/list', {
    params,
  });
}

export async function addMaterialCheckProject(data) {
  return request('/api/newhope/materialInspection/add', {
    method: 'POST',
    data,
  });
}

export async function removeMaterialCheckProject(params) {
  return request('/api/newhope/materialInspection/remove', {
    params,
  });
}

export async function updateMaterialCheckProject(data) {
  return request('/api/newhope/materialInspection/edit', {
    method: 'POST',
    data,
  });
}

// 化验项目设置
export async function getMaterialAssayProjectListAll() {
  return request('/api/newhope/inspection/all');
}

export async function getMaterialAssayProjectList(params) {
  return request('/api/newhope/inspection/list', {
    params,
  });
}

export async function addMaterialAssayProject(data) {
  return request('/api/newhope/inspection/add', {
    method: 'POST',
    data,
  });
}

export async function removeMaterialAssayProject(params) {
  return request('/api/newhope/inspection/remove', {
    params,
  });
}

export async function updateMaterialAssayProject(data) {
  return request('/api/newhope/inspection/edit', {
    method: 'POST',
    data,
  });
}

// 用户管理
export async function getUserList(params) {
  return request('/api/newhope/user/list', {
    params,
  });
}

export async function addUser(data) {
  return request('/api/newhope/user/add', {
    method: 'POST',
    data,
  });
}

export async function removeUser(params) {
  return request('/api/newhope/user/remove', {
    params,
  });
}

export async function updateUser(data) {
  return request('/api/newhope/user/edit', {
    method: 'POST',
    data,
  });
}
