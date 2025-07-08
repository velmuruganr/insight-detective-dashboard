
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import { AlertTriangle, CheckCircle, Clock, Cpu, Database, HardDrive, Network, Zap } from "lucide-react";

const DashboardOverview = () => {
  const performanceData = [
    { time: '00:00', cpu: 45, memory: 67, network: 23 },
    { time: '04:00', cpu: 52, memory: 71, network: 28 },
    { time: '08:00', cpu: 78, memory: 85, network: 45 },
    { time: '12:00', cpu: 84, memory: 89, network: 52 },
    { time: '16:00', cpu: 76, memory: 82, network: 38 },
    { time: '20:00', cpu: 58, memory: 74, network: 31 },
  ];

  const errorTrends = [
    { category: 'OutOfMemoryError', count: 23, severity: 'high' },
    { category: 'DeadlockException', count: 7, severity: 'high' },
    { category: 'ConnectionTimeout', count: 15, severity: 'medium' },
    { category: 'SQLSyntaxError', count: 31, severity: 'medium' },
    { category: 'NullPointerException', count: 45, severity: 'low' },
  ];

  const systemHealth = [
    { component: 'JVM', status: 'healthy', utilization: 78, issues: 2 },
    { component: 'Database', status: 'warning', utilization: 89, issues: 7 },
    { component: 'Application Server', status: 'healthy', utilization: 65, issues: 1 },
    { component: 'Network', status: 'critical', utilization: 95, issues: 12 },
  ];

  const getBarColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      default:
        return '#10B981';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* System Performance Chart */}
      <Card className="xl:col-span-2 bg-slate-800/30 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Cpu className="h-5 w-5 mr-2 text-blue-400" />
            System Performance Trends
          </CardTitle>
          <CardDescription className="text-slate-400">
            Analysis based on uploaded dump files and logs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Area type="monotone" dataKey="cpu" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              <Area type="monotone" dataKey="memory" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
              <Area type="monotone" dataKey="network" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* System Health Status */}
      <Card className="bg-slate-800/30 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <HardDrive className="h-5 w-5 mr-2 text-green-400" />
            Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {systemHealth.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">{item.component}</span>
                <div className="flex items-center space-x-2">
                  {item.status === 'healthy' && <CheckCircle className="h-4 w-4 text-green-400" />}
                  {item.status === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-400" />}
                  {item.status === 'critical' && <AlertTriangle className="h-4 w-4 text-red-400" />}
                  <Badge 
                    variant={
                      item.status === 'healthy' ? 'default' : 
                      item.status === 'warning' ? 'secondary' : 'destructive'
                    }
                    className="text-xs"
                  >
                    {item.issues} issues
                  </Badge>
                </div>
              </div>
              <Progress 
                value={item.utilization} 
                className="h-2"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>Utilization</span>
                <span>{item.utilization}%</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Error Analysis */}
      <Card className="xl:col-span-2 bg-slate-800/30 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
            Error Pattern Analysis
          </CardTitle>
          <CardDescription className="text-slate-400">
            Most frequent errors from uploaded files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={errorTrends} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9CA3AF" />
              <YAxis dataKey="category" type="category" stroke="#9CA3AF" width={120} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar 
                dataKey="count" 
                fill="#3B82F6"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-slate-800/30 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-400" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-slate-300">Generate Report</span>
            </div>
            <Badge variant="outline" className="text-xs">Ready</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Database className="h-4 w-4 text-green-400" />
              <span className="text-sm text-slate-300">Optimize Queries</span>
            </div>
            <Badge variant="secondary" className="text-xs">43 pending</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Network className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-slate-300">Export Analysis</span>
            </div>
            <Badge variant="outline" className="text-xs">Available</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { DashboardOverview };
