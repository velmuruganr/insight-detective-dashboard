
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from "recharts";
import { FileText, AlertTriangle, Search, Filter, Clock, TrendingUp, Zap, Server } from "lucide-react";

const JBossLogAnalyzer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [logLevel, setLogLevel] = useState("all");

  const errorTrends = [
    { time: '10:00', errors: 12, warnings: 34, info: 156, debug: 89 },
    { time: '10:15', errors: 18, warnings: 45, info: 178, debug: 92 },
    { time: '10:30', errors: 25, warnings: 52, info: 201, debug: 87 },
    { time: '10:45', errors: 31, warnings: 48, info: 189, debug: 95 },
    { time: '11:00', errors: 28, warnings: 41, info: 167, debug: 91 },
    { time: '11:15', errors: 22, warnings: 38, info: 145, debug: 88 },
  ];

  const topErrors = [
    {
      error: 'java.lang.OutOfMemoryError',
      count: 47,
      lastOccurrence: '2 minutes ago',
      severity: 'critical',
      pattern: 'Heap space exhausted'
    },
    {
      error: 'java.sql.SQLException',
      count: 23,
      lastOccurrence: '5 minutes ago',
      severity: 'high',
      pattern: 'Connection timeout'
    },
    {
      error: 'javax.servlet.ServletException',
      count: 18,
      lastOccurrence: '8 minutes ago',
      severity: 'medium',
      pattern: 'Request processing failed'
    },
    {
      error: 'java.lang.NullPointerException',
      count: 34,
      lastOccurrence: '12 minutes ago',
      severity: 'medium',
      pattern: 'Null reference access'
    }
  ];

  const performanceMetrics = [
    { metric: 'Average Response Time', value: '245ms', trend: '+12%', status: 'warning' },
    { metric: 'Request Throughput', value: '1,247/min', trend: '-5%', status: 'good' },
    { metric: 'Error Rate', value: '2.3%', trend: '+0.8%', status: 'warning' },
    { metric: 'Memory Usage', value: '78%', trend: '+15%', status: 'critical' }
  ];

  const recentLogs = [
    {
      timestamp: '2024-01-15 11:23:45',
      level: 'ERROR',
      logger: 'com.example.service.UserService',
      message: 'Failed to process user registration: Database connection timeout',
      thread: 'http-nio-8080-exec-1'
    },
    {
      timestamp: '2024-01-15 11:23:42',
      level: 'WARN',
      logger: 'org.jboss.as.ejb3',
      message: 'EJB invocation took longer than expected: 2.5 seconds',
      thread: 'EJB-pool-2'
    },
    {
      timestamp: '2024-01-15 11:23:40',
      level: 'INFO',
      logger: 'com.example.controller.ApiController',
      message: 'Processing API request for endpoint /api/users',
      thread: 'http-nio-8080-exec-3'
    },
    {
      timestamp: '2024-01-15 11:23:38',
      level: 'ERROR',
      logger: 'com.example.dao.DatabaseConnection',
      message: 'Connection pool exhausted, unable to obtain connection',
      thread: 'db-pool-manager'
    }
  ];

  const applicationModules = [
    { module: 'Authentication Service', errors: 23, warnings: 45, status: 'healthy' },
    { module: 'User Management', errors: 34, warnings: 67, status: 'warning' },
    { module: 'Payment Processing', errors: 12, warnings: 21, status: 'healthy' },
    { module: 'Notification Service', errors: 56, warnings: 89, status: 'critical' },
  ];

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-slate-800/30 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Server className="h-5 w-5 mr-2 text-red-400" />
            JBoss Log Analysis Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search logs by message, logger, or thread..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
            </div>
            <Select value={logLevel} onValueChange={setLogLevel}>
              <SelectTrigger className="w-48 bg-slate-700/50 border-slate-600 text-white">
                <SelectValue placeholder="Select log level" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="error">ERROR</SelectItem>
                <SelectItem value="warn">WARN</SelectItem>
                <SelectItem value="info">INFO</SelectItem>
                <SelectItem value="debug">DEBUG</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="bg-slate-800/30 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">{metric.metric}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <Badge 
                      variant={
                        metric.status === 'good' ? 'default' : 
                        metric.status === 'warning' ? 'secondary' : 'destructive'
                      }
                      className="text-xs"
                    >
                      {metric.trend}
                    </Badge>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${
                  metric.status === 'good' ? 'bg-green-600/20 text-green-400' :
                  metric.status === 'warning' ? 'bg-yellow-600/20 text-yellow-400' :
                  'bg-red-600/20 text-red-400'
                }`}>
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="error-analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-700/50">
          <TabsTrigger value="error-analysis" className="data-[state=active]:bg-blue-600">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Error Analysis
          </TabsTrigger>
          <TabsTrigger value="log-trends" className="data-[state=active]:bg-blue-600">
            <TrendingUp className="h-4 w-4 mr-2" />
            Log Trends
          </TabsTrigger>
          <TabsTrigger value="recent-logs" className="data-[state=active]:bg-blue-600">
            <FileText className="h-4 w-4 mr-2" />
            Recent Logs
          </TabsTrigger>
          <TabsTrigger value="modules" className="data-[state=active]:bg-blue-600">
            <Zap className="h-4 w-4 mr-2" />
            Modules
          </TabsTrigger>
        </TabsList>

        <TabsContent value="error-analysis" className="mt-6">
          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                Top Error Patterns
              </CardTitle>
              <CardDescription className="text-slate-400">
                Most frequent errors and their patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topErrors.map((error, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    error.severity === 'critical' ? 'bg-red-900/20 border-red-800/50' :
                    error.severity === 'high' ? 'bg-orange-900/20 border-orange-800/50' :
                    'bg-yellow-900/20 border-yellow-800/50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={
                            error.severity === 'critical' ? 'destructive' : 
                            error.severity === 'high' ? 'secondary' : 'outline'
                          }
                          className="text-xs"
                        >
                          {error.severity.toUpperCase()}
                        </Badge>
                        <span className="font-medium text-white">{error.error}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{error.lastOccurrence}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {error.count} occurrences
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 mb-3">
                      <strong>Pattern:</strong> {error.pattern}
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                        Create Alert
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="log-trends" className="mt-6">
          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
                Log Level Trends
              </CardTitle>
              <CardDescription className="text-slate-400">
                Distribution of log levels over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={errorTrends}>
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
                  <Area type="monotone" dataKey="errors" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.8} />
                  <Area type="monotone" dataKey="warnings" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="info" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.4} />
                  <Area type="monotone" dataKey="debug" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent-logs" className="mt-6">
          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="h-5 w-5 mr-2 text-green-400" />
                Recent Log Entries
              </CardTitle>
              <CardDescription className="text-slate-400">
                Latest log messages from JBoss server
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLogs.map((log, index) => (
                  <div key={index} className="p-4 bg-slate-700/30 rounded-lg border-l-4 border-l-gray-400">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={
                            log.level === 'ERROR' ? 'destructive' : 
                            log.level === 'WARN' ? 'secondary' : 'default'
                          }
                          className="text-xs"
                        >
                          {log.level}
                        </Badge>
                        <span className="text-xs text-slate-400">{log.timestamp}</span>
                      </div>
                      <span className="text-xs text-slate-400">{log.thread}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-sm text-slate-300 font-medium">{log.logger}</span>
                    </div>
                    <p className="text-sm text-white">{log.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="mt-6">
          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="h-5 w-5 mr-2 text-purple-400" />
                Application Module Health
              </CardTitle>
              <CardDescription className="text-slate-400">
                Error and warning distribution across application modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applicationModules.map((module, index) => (
                  <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-white">{module.module}</span>
                        <Badge 
                          variant={
                            module.status === 'healthy' ? 'default' : 
                            module.status === 'warning' ? 'secondary' : 'destructive'
                          }
                          className="text-xs"
                        >
                          {module.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-slate-400">Errors</span>
                        <p className="text-lg font-bold text-red-400">{module.errors}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400">Warnings</span>
                        <p className="text-lg font-bold text-yellow-400">{module.warnings}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { JBossLogAnalyzer };
